🚀 ITlife
<p align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:1e293b&height=180&section=header&text=ITlife&fontSize=60&fontColor=ffffff&animation=fadeIn" /> </p> <p align="center"> <b>Modern IT School Platform</b><br/> FastAPI • Next.js • TypeScript • JWT </p> <p align="center"> <img src="https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/SQLite-blue?style=flat&logo=sqlite"/> </p>
🧠 About

ITlife — full-stack платформа для IT-школы.

Позволяет:

📚 Просматривать курсы

📝 Оставлять заявки

🔐 Авторизоваться через JWT

🛠 Управлять заявками через админ-панель

Архитектура построена по принципу разделения frontend и backend.

🏗 Architecture
Next.js (Frontend)
        ↓
FastAPI REST API
        ↓
SQLite (dev) / PostgreSQL (ready)

⚙️ Tech Stack
Backend

FastAPI

SQLAlchemy 2.0

Pydantic v2

JWT Authentication

SQLite

Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

🚀 Local Setup
Backend
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000


Swagger:

http://127.0.0.1:8000/docs

Frontend
cd frontend
npm install


Создать .env.local:

NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000


Запуск:

npm run dev


Открыть:

http://localhost:3000

🔐 Admin Access

Админ создаётся автоматически при старте backend:

ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin12345

✨ Features

REST API

JWT Authentication

Course Management

Lead Management

Role separation

Auto database seed

📌 Roadmap

PostgreSQL

Docker

CI/CD

Production deployment

Payment integration