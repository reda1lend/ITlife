from datetime import datetime
from pydantic import BaseModel, Field

class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    contact: str = Field(min_length=3, max_length=120)
    course_slug: str
    age_category: str
    message: str = ""

class LeadOut(BaseModel):
    id: int
    name: str
    contact: str
    course_slug: str
    age_category: str
    message: str
    status: str
    admin_note: str
    created_at: datetime  # ✅ ВАЖНО

    class Config:
        from_attributes = True

class LeadUpdate(BaseModel):
    status: str | None = None
    admin_note: str | None = None
