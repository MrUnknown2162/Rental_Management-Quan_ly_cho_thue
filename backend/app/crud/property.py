from sqlalchemy.orm import Session
from app.models.property import Property
from app.schemas.property import PropertyCreate


def create_property(
    db: Session,
    owner_id: int,
    data: PropertyCreate
):
    prop = Property(
        owner_id=owner_id,
        name=data.name,
        address=data.address,
        description=data.description,
    )
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop


def get_properties_by_owner(db: Session, owner_id: int):
    return db.query(Property).filter(Property.owner_id == owner_id).all()
