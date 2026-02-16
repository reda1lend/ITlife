from datetime import datetime

from sqlalchemy import String, Integer, Text, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    title: Mapped[str] = mapped_column(String(200), index=True)
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True)

    level: Mapped[str] = mapped_column(String(50), default="beginner")
    duration_weeks: Mapped[int] = mapped_column(Integer, default=4)
    format: Mapped[str] = mapped_column(String(50), default="online")
    price_uah: Mapped[int] = mapped_column(Integer, default=0)

    short_desc: Mapped[str] = mapped_column(String(280), default="")
    description: Mapped[str] = mapped_column(Text, default="")

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
