from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PropertyBase(BaseModel):
    name: str
    address: str
    description: Optional[str] = None


class PropertyCreate(PropertyBase):
    pass


class PropertyRead(PropertyBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True
