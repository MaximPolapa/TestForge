from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_users import router as user_router
from app.api import routes_auth
from app.core.database import Base, engine
from app.api import routes_repository


# 1. Ініціалізація FastAPI
app = FastAPI(
    title="TestForge API",
    version="1.0.0"
)

# 2. Створення таблиць (можна залишити)
Base.metadata.create_all(bind=engine)

# 3. ДОДАЙ МІДДЛВАР ДО ІНКЛЮДІВ
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # тут фронтенд
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Лише після цього — додавай роутери
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(routes_auth.router, tags=["Auth"])
app.include_router(routes_repository.router)
