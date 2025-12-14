from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    email: str
    role: str   # ⭐ BẮT BUỘC

    class Config:
        from_attributes = True
    