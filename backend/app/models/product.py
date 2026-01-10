from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)
    image_url = Column(String, nullable=True)
    stock = Column(Integer, default=0)
    sold = Column(Integer, default=0)
    offer_end_date = Column(DateTime(timezone=True), nullable=True)
    featured = Column(Boolean, default=False)
    purchase_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    orders = relationship("Order", back_populates="product")

