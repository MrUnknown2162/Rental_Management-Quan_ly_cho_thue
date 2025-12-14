from fastapi import FastAPI
from app.api import auth

app = FastAPI(title="Rental Management API")

app.include_router(auth.router, prefix="/auth", tags=["auth"])


@app.get("/")
def root():
    return {"message": "API quản lý cho thuê đang hoạt động"}
