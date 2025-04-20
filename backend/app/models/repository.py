from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    github_url = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    # зв'язок з User
    user = relationship("User", back_populates="repositories")
