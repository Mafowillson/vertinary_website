from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    image_url: Optional[str] = None
    stock: Optional[int] = 0
    offer_end_date: Optional[datetime] = None
    featured: bool = False

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    offer_end_date: Optional[datetime] = None
    featured: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int
    sold: int
    purchase_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

