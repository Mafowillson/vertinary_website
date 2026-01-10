from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import engine, Base
from app.api.v1 import api_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vertinary Website API",
    description="Backend API for L'Académie DES Éleveurs",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Vertinary Website API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

