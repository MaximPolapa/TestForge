# unit-tests-service/main.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from unitTests_logic import read_files, generate_unit_tests, save_unit_tests
import os
import glob
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class RepoInput(BaseModel):
    path: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # або вкажи фронтенд URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate_handler(data: RepoInput):
    path = data.path
    py_files = glob.glob(os.path.join(path, "**/*.py"), recursive=True)[:3]

    if not py_files:
        return {"message": "❌ Не знайдено файлів .py"}

    file_contents = read_files(py_files)
    generated_tests = generate_unit_tests(file_contents)
    save_unit_tests(generated_tests, os.path.join(path, "test_generated.py"))

    return {
        "message": "✅ Тести згенеровано успішно",
        "files_analyzed": py_files,
        "tests": generated_tests
    }
