from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth
from app.api import property
from app.api import unit
from app.api import booking

app = FastAPI(title="Rental Management API")

# ===== CORS (BẮT BUỘC) =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # làm bài nộp dùng *
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== ROUTERS =====
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(property.router, prefix="/properties", tags=["properties"])
app.include_router(unit.router, prefix="/units", tags=["units"])
app.include_router(booking.router, prefix="/bookings", tags=["bookings"])

@app.get("/")
def root():
    return {"message": "API quản lý cho thuê đang hoạt động"}
