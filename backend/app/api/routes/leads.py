from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadOut

router = APIRouter(prefix="/leads", tags=["leads"])

@router.post("", response_model=LeadOut)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    data = payload.model_dump()
    lead = Lead(**data)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead
