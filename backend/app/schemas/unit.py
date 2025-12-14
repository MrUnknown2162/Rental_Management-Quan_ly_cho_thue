from pydantic import BaseModel
from datetime import datetime


class UnitBase(BaseModel):
    name: str
    price: int
    description: str | None = None
    is_available: bool = True


class UnitCreate(UnitBase):
    property_id: int


class UnitRead(UnitBase):
    id: int
    property_id: int
    created_at: datetime

    class Config:
        from_attributes = True
