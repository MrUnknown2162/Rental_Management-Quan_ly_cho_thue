from datetime import date
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

from app.crud.booking import approve_booking, reject_booking
from app.models.user import User
from app.core.token import get_current_user


router = APIRouter()


@router.post("/", response_model=BookingRead)
def create_new_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 🔒 1. CHẶN NGÀY TRONG QUÁ KHỨ
    if data.start_date < date.today():
        raise HTTPException(
            status_code=400,
            detail="Ngày bắt đầu không hợp lệ"
        )

    # 🔒 2. CHẶN NGÀY KẾT THÚC < NGÀY BẮT ĐẦU
    if data.end_date < data.start_date:
        raise HTTPException(
            status_code=400,
            detail="Ngày kết thúc không hợp lệ"
        )

    # 🔒 3. CHECK TRÙNG LỊCH (DUY NHẤT)
    if not is_unit_available(
        db,
        data.unit_id,
        data.start_date,
        data.end_date,
    ):
        raise HTTPException(
            status_code=400,
            detail="Unit is not available"
        )

    # ✅ 4. TẠO BOOKING
    return create_booking(db, current_user.id, data)


@router.get("/by-unit/{unit_id}", response_model=List[BookingRead])
def list_bookings(
    unit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_bookings_by_unit(db, unit_id)

@router.put("/admin/approve/{booking_id}", response_model=BookingRead)
def admin_approve_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    booking = approve_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return booking

@router.put("/admin/reject/{booking_id}", response_model=BookingRead)
def admin_reject_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    booking = reject_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return booking
