<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:111827,100:000000&height=200&section=header&text=ITlife&fontSize=60&fontColor=ffffff&animation=fadeIn" />
</p>

<h3 align="center">
  Платформа IT-школы с разделённой архитектурой  
  FastAPI + Next.js
</h3>

---

## 📌 О проекте

**ITlife** — полнофункциональная full-stack платформа для IT-школы.

Проект построен по модульной архитектуре с чётким разделением frontend и backend слоёв.  
Реализована авторизация, управление курсами и обработка заявок.

---


## ⚙ Стек технологий

### Backend
- FastAPI  
- SQLAlchemy 2.0  
- Pydantic v2  
- JWT аутентификация  
- SQLite  

### Frontend
- Next.js (App Router)  
- TypeScript  
- Tailwind CSS  

---

## 🚀 Возможности

- REST API  
- JWT авторизация  
- Админ-панель  
- Управление курсами  
- Обработка заявок  
- Разделение ролей  
- Автоматическое создание администратора  

---

## 🖥 Локальный запуск

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000


