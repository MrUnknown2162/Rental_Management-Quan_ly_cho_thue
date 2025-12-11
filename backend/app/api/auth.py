from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.user import UserCreate, UserRead
from app.crud.user import create_user, get_user_by_email

router = APIRouter()

@router.post("/register", response_model=UserRead)
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = get_user_by_email(db, data.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = create_user(db, data)
    return new_user
