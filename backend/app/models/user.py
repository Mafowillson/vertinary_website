from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.database import Base

class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.USER, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    email_verification_token = Column(String, unique=True, nullable=True, index=True)
    email_verification_expires_at = Column(DateTime(timezone=True), nullable=True)
    verification_email_last_sent_at = Column(DateTime(timezone=True), nullable=True)
    password_reset_token = Column(String, unique=True, nullable=True, index=True)
    password_reset_expires_at = Column(DateTime(timezone=True), nullable=True)
    password_reset_email_last_sent_at = Column(DateTime(timezone=True), nullable=True)
    preferred_language = Column(String(5), default="en", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")
    product_likes = relationship("ProductLike", back_populates="user")

