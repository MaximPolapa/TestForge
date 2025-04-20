from pydantic import BaseModel
from typing import Optional

class RepositoryBase(BaseModel):
    name: str
    github_url: str

class RepositoryCreate(RepositoryBase):
    pass

class RepositoryOut(RepositoryBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
