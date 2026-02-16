from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.models.user import User
from app.models.course import Course
from app.services.slug import slugify
from app.core.security import hash_password, verify_password

def seed(db: Session):
    # admin
    admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=hash_password(settings.ADMIN_PASSWORD),
            is_admin=True,
        )
        db.add(admin)

    # courses
    if db.query(Course).count() == 0:
        courses = [
            {
                "title": "Python + Web (FastAPI)",
                "level": "beginner",
                "duration_weeks": 6,
                "format": "online",
                "price_uah": 4900,
                "short_desc": "С нуля до API + база + деплой. Финальный проект в портфолио.",
                "description": "Неделя 1: Python базовый\nНеделя 2: HTTP/REST\nНеделя 3: FastAPI + Pydantic\nНеделя 4: SQLAlchemy + миграции\nНеделя 5: Auth + роли\nНеделя 6: Деплой + финальный проект",
            },
            {
                "title": "UX/UI Design (Figma)",
                "level": "beginner",
                "duration_weeks": 4,
                "format": "online",
                "price_uah": 3500,
                "short_desc": "Дизайн интерфейсов: сетки, компоненты, прототипы, кейс.",
                "description": "В конце: кейс в портфолио + набор компонентов.",
            },
            {
                "title": "Cyber basics (OSINT + безопасность)",
                "level": "basic",
                "duration_weeks": 4,
                "format": "online",
                "price_uah": 4200,
                "short_desc": "Публичная разведка, базовая гигиена, анализ домена без атак.",
                "description": "Только легальные методы: DNS, TLS, заголовки, утечки, чек-листы.",
            },
        ]
        for c in courses:
            c["slug"] = slugify(c["title"])
            db.add(Course(**c))

    db.commit()
