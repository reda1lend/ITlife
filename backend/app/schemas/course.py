from pydantic import BaseModel

class CourseOut(BaseModel):
    title: str
    slug: str
    level: str
    duration_weeks: int
    format: str
    price_uah: int
    short_desc: str
    description: str

    class Config:
        from_attributes = True
