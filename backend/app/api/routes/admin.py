from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.api.deps import get_db, get_current_admin
from app.models.lead import Lead
from app.schemas.lead import LeadOut, LeadUpdate

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/leads", response_model=list[LeadOut])
def admin_list_leads(
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin),
):
    return db.query(Lead).order_by(Lead.id.desc()).all()

@router.patch("/leads/{lead_id}", response_model=LeadOut)
def admin_update_lead(
    lead_id: int,
    payload: LeadUpdate,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        # чтобы не падало
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Lead not found")

    if payload.status is not None:
        lead.status = payload.status

        if payload.status == "closed":
            lead.closed_at = datetime.now(timezone.utc)
        else:
            lead.closed_at = None

    if payload.admin_note is not None:
        lead.admin_note = payload.admin_note

    db.commit()
    db.refresh(lead)
    return lead
