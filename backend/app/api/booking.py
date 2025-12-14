from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.booking import BookingCreate, BookingRead
from app.crud.booking import (
    create_booking,
    get_bookings_by_unit,
    is_unit_available,
)
from app.core.token import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=BookingRead)
def create_new_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not is_unit_available(db, data.unit_id, data.start_date, data.end_date):
        raise HTTPException(status_code=400, detail="Unit is not available")

    return create_booking(db, current_user.id, data)


@router.get("/by-unit/{unit_id}", response_model=List[BookingRead])
def list_bookings(
    unit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_bookings_by_unit(db, unit_id)
