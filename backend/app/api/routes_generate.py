from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.repository import Repository
from app.utils.jwt_token import get_current_user
from pydantic import BaseModel
import requests
import os
import subprocess

router = APIRouter(prefix="/repositories", tags=["generate-tests"])

UNIT_GEN_URL = os.getenv("UNIT_GEN_URL", "http://unitgenerator:5000")

class GenerateRequest(BaseModel):
    github_username: str
    github_token: str
    branch_name: str

@router.post("/{repo_id}/generate-tests")
def generate_tests(
    repo_id: int,
    payload: GenerateRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    github_username = payload.github_username
    github_token = payload.github_token
    branch_name = payload.branch_name

    if not github_username or not github_token or not branch_name:
        raise HTTPException(status_code=400, detail="Необхідні username, token і branch_name")

    repo = db.query(Repository).filter_by(id=repo_id, user_id=user.id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Репозиторій не знайдено")

    clone_path = f"/shared/tmp_repo_{repo_id}"
    os.system(f"rm -rf {clone_path}")
    clone_url = f"https://{github_username}:{github_token}@{repo.github_url[8:]}"
    clone_result = os.system(f"git clone {clone_url} {clone_path}")

    if clone_result != 0:
        raise HTTPException(status_code=500, detail="Не вдалося клонувати репозиторій")

    # Налаштування гіта
    os.system(f'cd {clone_path} && git config user.email "{github_username}@example.com"')
    os.system(f'cd {clone_path} && git config user.name "{github_username}"')

    # Генерація тестів
    response = requests.post(UNIT_GEN_URL, json={"path": clone_path})
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Генерація тестів не вдалася")

    # Коміт і пуш
    os.system(f"cd {clone_path} && git add .")
    commit_result = os.system(f'cd {clone_path} && git commit -m "Add generated unit tests by GenAI Unit Test Generator" || echo "no changes"')

    # Якщо нема чого комітити, просто ігноримо
    push_result = os.system(f"cd {clone_path} && git push origin {branch_name}")

    if push_result != 0:
        raise HTTPException(status_code=500, detail="Помилка при пуші змін на GitHub")

    return {"message": "✅ Тести згенеровані і успішно запушені!"}

