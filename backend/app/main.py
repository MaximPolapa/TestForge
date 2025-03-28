from fastapi import FastAPI
from app.api.routes_users import router as user_router

app = FastAPI(
    title="TestForge API",
    version="1.0.0"
)

app.include_router(user_router, prefix="/api/users", tags=["Users"])
