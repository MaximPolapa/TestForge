from sqlalchemy.orm import Session
from app.models.repository import Repository
from app.schemas.repository import RepositoryCreate

def create_repository(db: Session, repo: RepositoryCreate, user_id: int):
    db_repo = Repository(**repo.dict(), user_id=user_id)
    db.add(db_repo)
    db.commit()
    db.refresh(db_repo)
    return db_repo

def get_repositories_by_user(db: Session, user_id: int):
    return db.query(Repository).filter(Repository.user_id == user_id).all()

def get_repository_by_id(db: Session, repo_id: int):
    return db.query(Repository).filter(Repository.id == repo_id).first()

