from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.property import PropertyCreate, PropertyRead
from app.crud.property import create_property, get_properties_by_owner
from app.core.token import get_current_user
from app.models.user import User
from app.core.token import get_current_user

router = APIRouter()


@router.post("/", response_model=PropertyRead)
def create_new_property(
    data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_property(db, current_user.id, data)


@router.get("/", response_model=List[PropertyRead])
def list_my_properties(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_properties_by_owner(db, current_user.id)
