from fastapi import FastAPI
from app.api import auth

app = FastAPI(title="Rental Management API")

app.include_router(auth.router, prefix="/auth", tags=["auth"])


@app.get("/")
def root():
    return {"message": "API quản lý cho thuê đang hoạt động"}

from app.api import property

app.include_router(
    property.router,
    prefix="/properties",
    tags=["properties"]
)

from app.api import unit

app.include_router(
    unit.router,
    prefix="/units",
    tags=["units"]
)

from app.api import booking

app.include_router(
    booking.router,
    prefix="/bookings",
    tags=["bookings"]
)
