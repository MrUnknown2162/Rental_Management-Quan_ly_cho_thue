from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.unit import UnitCreate, UnitRead
from app.crud.unit import create_unit, get_units_by_property
from app.core.token import get_current_user
from app.models.user import User
from app.models.property import Property

router = APIRouter()


@router.post("/", response_model=UnitRead)
def create_new_unit(
    data: UnitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # kiểm tra property có thuộc user không
    prop = db.query(Property).filter(
        Property.id == data.property_id,
        Property.owner_id == current_user.id
    ).first()

    if not prop:
        raise HTTPException(status_code=403, detail="Not your property")

    return create_unit(db, data)


@router.get("/by-property/{property_id}", response_model=List[UnitRead])
def list_units(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_units_by_property(db, property_id)
