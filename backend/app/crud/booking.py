from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.models.booking import Booking
from app.schemas.booking import BookingCreate


def is_unit_available(
    db: Session,
    unit_id: int,
    start_date,
    end_date,
):
    conflict = (
        db.query(Booking)
        .filter(Booking.unit_id == unit_id)
        .filter(Booking.status == "approved")  # 🔒 CHỈ BLOCK KHI ĐÃ DUYỆT
        .filter(Booking.start_date <= end_date)
        .filter(Booking.end_date >= start_date)
        .first()
    )

    return conflict is None




def create_booking(
    db: Session,
    user_id: int,
    data: BookingCreate,
):
    booking = Booking(
    unit_id=data.unit_id,
    user_id=user_id,
    start_date=data.start_date,
    end_date=data.end_date,
    status="pending"   # 👈 THÊM
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def get_bookings_by_unit(db: Session, unit_id: int):
    return db.query(Booking).filter(Booking.unit_id == unit_id).all()


def approve_booking(db: Session, booking_id: int):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        return None

    booking.status = "approved"
    db.commit()
    db.refresh(booking)
    return booking


def reject_booking(db: Session, booking_id: int):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        return None

    booking.status = "rejected"
    db.commit()
    db.refresh(booking)
    return booking
