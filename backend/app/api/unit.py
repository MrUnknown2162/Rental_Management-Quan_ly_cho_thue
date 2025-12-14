from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.unit import UnitCreate, UnitRead
from app.crud.unit import create_unit, get_units_by_property
from app.core.token import get_current_user
from app.models.user import User
from app.models.property import Property
from app.models.unit import Unit
from app.core.token import get_current_user

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

@router.put("/{unit_id}")
def update_unit(
    unit_id: int,
    data: UnitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    unit = db.query(Unit).filter(Unit.id == unit_id).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Unit not found")

    unit.name = data.name
    unit.price = data.price
    unit.description = data.description
    unit.is_available = data.is_available

    db.commit()
    db.refresh(unit)
    return unit


@router.delete("/{unit_id}")
def delete_unit(
    unit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    unit = db.query(Unit).filter(Unit.id == unit_id).first()
    if not unit:
        raise HTTPException(status_code=404, detail="Unit not found")

    db.delete(unit)
    db.commit()

    return {"message": "Đã xóa tài sản"}
