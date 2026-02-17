from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.db.init_db import seed

from app.api.routes.auth import router as auth_router
from app.api.routes.courses import router as courses_router
from app.api.routes.leads import router as leads_router
from app.api.routes.admin import router as admin_router

import asyncio
from datetime import datetime, timedelta, timezone
from sqlalchemy import delete, and_

from app.models.lead import Lead


async def closed_leads_cleaner():
    while True:
        try:
            cutoff = datetime.now(timezone.utc) - timedelta(hours=1)

            with SessionLocal() as db:
                db.execute(
                    delete(Lead).where(
                        and_(
                            Lead.status == "closed",
                            Lead.closed_at.is_not(None),
                            Lead.closed_at <= cutoff,
                        )
                    )
                )
                db.commit()
        except Exception as e:
            print("Cleaner error:", e)

        await asyncio.sleep(60)  # проверка раз в минуту


def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME)

    async def on_startup():
        asyncio.create_task(closed_leads_cleaner())

    app.add_event_handler("startup", on_startup)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    def on_startup():
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            seed(db)
        finally:
            db.close()

    app.include_router(auth_router, prefix="/api")
    app.include_router(courses_router, prefix="/api")
    app.include_router(leads_router, prefix="/api")
    app.include_router(admin_router, prefix="/api")

    @app.get("/api/health")
    def health():
        return {"ok": True, "name": settings.APP_NAME}

    return app

app = create_app()

