from fastapi import FastAPI
from app.api.auth import router as auth_router

app = FastAPI(title="Rental Management API")

app.include_router(auth_router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Backend OK"}
