from sqlalchemy.orm import Session
from app.models.unit import Unit
from app.schemas.unit import UnitCreate


def create_unit(db: Session, data: UnitCreate):
    unit = Unit(
        property_id=data.property_id,
        name=data.name,
        price=data.price,
        is_available=data.is_available,
    )
    db.add(unit)
    db.commit()
    db.refresh(unit)
    return unit


def get_units_by_property(db: Session, property_id: int):
    return db.query(Unit).filter(Unit.property_id == property_id).all()
