🚀 ITlife — Modern IT School Platform
<p align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:1e293b&height=200&section=header&text=ITlife&fontSize=60&fontColor=ffffff&animation=fadeIn" /> </p> <p align="center"> <b>Full-stack платформа для IT-школы</b><br/> FastAPI • Next.js • JWT • SQLAlchemy </p> <p align="center"> <img src="https://img.shields.io/badge/backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/> <img src="https://img.shields.io/badge/frontend-Next.js-black?style=for-the-badge&logo=next.js"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/database-SQLite-blue?style=for-the-badge&logo=sqlite"/> </p>
🌐 О проекте

ITlife — это современная веб-платформа для онлайн IT-школы.

Платформа позволяет:

📚 Просматривать курсы

📝 Оставлять заявки на обучение

🔐 Авторизовываться через JWT

🛠 Управлять заявками через админ-панель

⚡ Работать через REST API

Проект построен по принципу разделения frontend и backend.

🏗 Архитектура
Next.js (Frontend)
        ↓
FastAPI REST API
        ↓
SQLite (dev) / PostgreSQL (ready)

🧰 Tech Stack
🔹 Backend

FastAPI

SQLAlchemy 2.0

Pydantic v2

JWT Authentication

SQLite

🔹 Frontend

Next.js (App Router)

TypeScript

Tailwind CSS



⚙️ Локальный запуск
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

🔐 Админ-доступ

Админ создаётся автоматически при старте backend.

ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin12345

✨ Функционал

CRUD курсов

Создание заявок

JWT авторизация

Админ-панель

Сидирование базы

Разделение ролей

📈 Roadmap

PostgreSQL

Docker

CI/CD

Продакшен деплой

Email-уведомления

Платёжная интеграция