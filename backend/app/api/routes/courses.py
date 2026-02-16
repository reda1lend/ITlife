from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.course import Course
from app.schemas.course import CourseOut

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("", response_model=list[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).filter(Course.is_active == True).order_by(Course.id.asc()).all()

@router.get("/{slug}", response_model=CourseOut)
def get_course(slug: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.slug == slug, Course.is_active == True).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
