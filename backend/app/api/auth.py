from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.database.session import get_db
from app.schemas.user import UserCreate, UserRead
from app.crud.user import create_user, get_user_by_email, authenticate_user
from app.core.token import create_access_token, get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/register", response_model=UserRead)
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = get_user_by_email(db, data.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user(db, data)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token({"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me", response_model=UserRead)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user
