from fastapi import APIRouter
from app.api.v1 import auth, products, orders, downloads, config, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(downloads.router, prefix="/downloads", tags=["downloads"])
api_router.include_router(config.router, prefix="/config", tags=["config"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])

