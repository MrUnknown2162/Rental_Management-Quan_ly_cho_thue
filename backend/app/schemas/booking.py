from pydantic import BaseModel
from datetime import date, datetime


class BookingCreate(BaseModel):
    unit_id: int
    start_date: date
    end_date: date


class BookingRead(BaseModel):
    id: int
    unit_id: int
    user_id: int
    start_date: date
    end_date: date
    status: str            # 👈 THÊM DÒNG NÀY
    created_at: datetime

class Config:
    from_attributes = True


