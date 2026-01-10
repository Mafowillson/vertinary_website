from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List
import uuid
from app.db.database import get_db
from app.models.order import Order, OrderStatus, PaymentMethod
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderResponse, PaymentRequest, PaymentResponse
from app.api.dependencies import get_current_user, get_current_admin_user
from app.models.user import User

router = APIRouter()

def generate_order_number() -> str:
    """Generate a unique order number."""
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new order."""
    # Verify product exists
    product = db.query(Product).filter(Product.id == order_data.product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Check stock if applicable
    if product.stock and product.stock <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product out of stock"
        )
    
    # Create order
    order_number = generate_order_number()
    db_order = Order(
        order_number=order_number,
        user_id=current_user.id,
        product_id=order_data.product_id,
        amount=order_data.amount,
        status=OrderStatus.PENDING
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Eager load product relationship
    order = db.query(Order).options(
        joinedload(Order.product)
    ).filter(Order.id == db_order.id).first()
    
    return OrderResponse.model_validate(order)

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get an order by ID."""
    order = db.query(Order).options(
        joinedload(Order.product)
    ).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check if user owns the order or is admin
    if order.user_id != current_user.id and current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this order"
        )
    
    return OrderResponse.model_validate(order)

@router.get("/my-orders", response_model=List[OrderResponse])
async def get_user_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all orders for the current user."""
    orders = db.query(Order).options(
        joinedload(Order.product)
    ).filter(Order.user_id == current_user.id).all()
    return [OrderResponse.model_validate(o) for o in orders]

@router.post("/{order_id}/payment", response_model=PaymentResponse)
async def process_payment(
    order_id: int,
    payment_data: PaymentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Process payment for an order."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check if user owns the order
    if order.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to process payment for this order"
        )
    
    # Update order status and payment method
    order.status = OrderStatus.COMPLETED
    order.payment_method = PaymentMethod(payment_data.payment_method)
    
    # Update product purchase count
    product = db.query(Product).filter(Product.id == order.product_id).first()
    if product:
        product.purchase_count = (product.purchase_count or 0) + 1
        if product.stock:
            product.stock -= 1
            product.sold = (product.sold or 0) + 1
    
    db.commit()
    
    # Reload order with product relationship
    order = db.query(Order).options(
        joinedload(Order.product)
    ).filter(Order.id == order_id).first()
    
    return PaymentResponse(
        success=True,
        message="Payment processed successfully",
        order=OrderResponse.model_validate(order)
    )

