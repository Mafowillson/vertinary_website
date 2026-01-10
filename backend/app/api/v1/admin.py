from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict
from app.db.database import get_db
from app.models.order import Order, OrderStatus
from app.models.product import Product
from app.models.user import User
from app.api.dependencies import get_current_admin_user
from app.models.user import User as UserModel

router = APIRouter()

@router.get("/analytics")
async def get_analytics(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_admin_user)
):
    """Get analytics statistics (admin only)."""
    # Total revenue
    total_revenue = db.query(func.sum(Order.amount)).filter(
        Order.status == OrderStatus.COMPLETED
    ).scalar() or 0
    
    # Total orders
    total_orders = db.query(func.count(Order.id)).filter(
        Order.status == OrderStatus.COMPLETED
    ).scalar() or 0
    
    # Total products
    total_products = db.query(func.count(Product.id)).scalar() or 0
    
    # Total users
    total_users = db.query(func.count(User.id)).scalar() or 0
    
    return {
        "totalRevenue": float(total_revenue),
        "totalOrders": total_orders,
        "totalProducts": total_products,
        "totalUsers": total_users
    }

@router.get("/orders")
async def get_all_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_admin_user)
):
    """Get all orders (admin only)."""
    from app.schemas.order import OrderResponse
    from sqlalchemy.orm import joinedload
    
    orders = db.query(Order).options(
        joinedload(Order.product)
    ).offset(skip).limit(limit).all()
    return [OrderResponse.model_validate(o) for o in orders]

