from fastapi import FastAPI

app = FastAPI(title="Rental Management API")

@app.get("/")
def root():
    return {"message": "Rental Management API is running"}
