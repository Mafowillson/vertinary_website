from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime


class ReviewCreate(BaseModel):
    body: str = Field(..., min_length=1, max_length=8000)
    rating: Optional[int] = Field(None, ge=1, le=5)


class ReviewUpdate(BaseModel):
    body: Optional[str] = Field(None, min_length=1, max_length=8000)
    rating: Optional[int] = Field(None, ge=1, le=5)


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    user_id: int
    user_name: str
    body: str
    rating: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
