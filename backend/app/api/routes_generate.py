from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.repository import Repository
from app.utils.jwt_token import get_current_user
import requests
import os

router = APIRouter(prefix="/repositories", tags=["generate-tests"])

UNIT_GEN_URL = os.getenv("UNIT_GEN_URL", "http://unitgenerator:5000")

@router.post("/{repo_id}/generate-tests")
def generate_tests(repo_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    repo = db.query(Repository).filter_by(id=repo_id, user_id=user.id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Репозиторій не знайдено")

    # Клонуємо репо у папку
    clone_path = f"/app/tmp_repo_{repo_id}"
    os.system(f"rm -rf {clone_path}")
    os.system(f"git clone {repo.github_url} {clone_path}")

    # Запит до сервісу генерації
    response = requests.post(UNIT_GEN_URL, json={"path": clone_path})
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Генерація тестів не вдалася")

    return response.json()
