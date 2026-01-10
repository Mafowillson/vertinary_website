from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schemas.product import ProductResponse

class OrderBase(BaseModel):
    product_id: int
    amount: float

class OrderCreate(OrderBase):
    pass

class PaymentRequest(BaseModel):
    payment_method: str

class OrderResponse(BaseModel):
    id: int
    order_number: str
    user_id: int
    product_id: int
    product: Optional[ProductResponse] = None
    amount: float
    status: str
    payment_method: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        use_enum_values = True

class PaymentResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    order: Optional[OrderResponse] = None

