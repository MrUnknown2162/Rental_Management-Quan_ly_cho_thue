from pydantic import BaseModel
from datetime import date, datetime


class BookingCreate(BaseModel):
    unit_id: int
    start_date: date
    end_date: date


class BookingRead(BookingCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
