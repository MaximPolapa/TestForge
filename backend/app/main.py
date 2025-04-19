from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_users import router as user_router
from app.core.database import Base, engine


app = FastAPI(
    title="TestForge API",
    version="1.0.0"
)
Base.metadata.create_all(bind=engine)
# Додаємо middleware для CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Тільки домен фронтенду
    allow_credentials=True,
    allow_methods=["*"],  # дозволяємо всі методи HTTP
    allow_headers=["*"],  # дозволяємо всі заголовки
)

# Включення маршруту для користувачів
app.include_router(user_router, prefix="/users", tags=["Users"])
