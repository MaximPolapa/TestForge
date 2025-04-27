# backend/Dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY ./backend /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y git


CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

