from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.repository import RepositoryCreate, RepositoryOut
from app.crud import repository
from app.utils.jwt_token import get_current_user
from app.models.user import User
from typing import List

router = APIRouter(prefix="/repositories", tags=["repositories"])

@router.post("/", response_model=RepositoryOut)
def add_repo(repo: RepositoryCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return repository.create_repository(db, repo, user.id)

@router.get("/", response_model=List[RepositoryOut])
def get_repos(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return repository.get_repositories_by_user(db, user.id)
