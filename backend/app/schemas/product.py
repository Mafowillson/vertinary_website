from pydantic import BaseModel, ConfigDict, Field, computed_field, model_validator
from typing import Optional, Any
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
    category: Optional[str] = None
    format: Optional[str] = Field(default=None, description="e.g. PDF Guide, E-book")
    pages: Optional[int] = None
    bestseller: bool = False


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
    category: Optional[str] = None
    format: Optional[str] = None
    pages: Optional[int] = None
    bestseller: Optional[bool] = None


class ProductResponse(ProductBase):
    """API shape expected by the frontend (snake_case + alias fields)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    sold: int = 0
    purchase_count: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None

    @model_validator(mode="before")
    @classmethod
    def map_product_orm(cls, data: Any) -> Any:
        """Map SQLAlchemy Product: ORM `content_format` -> schema `format`."""
        if data is None or isinstance(data, dict):
            return data
        if hasattr(data, "content_format"):
            return {
                "id": data.id,
                "title": data.title,
                "description": data.description,
                "price": data.price,
                "original_price": data.original_price,
                "image_url": data.image_url,
                "stock": data.stock,
                "offer_end_date": data.offer_end_date,
                "featured": data.featured,
                "category": data.category,
                "format": data.content_format,
                "pages": data.pages,
                "bestseller": data.bestseller,
                "sold": data.sold,
                "purchase_count": data.purchase_count,
                "created_at": data.created_at,
                "updated_at": data.updated_at,
            }
        return data

    @computed_field
    @property
    def discount_end_date(self) -> Optional[datetime]:
        """Frontend checks discount_end_date / offer_end_date interchangeably."""
        return self.offer_end_date

    @computed_field
    @property
    def download_count(self) -> int:
        """Frontend fallback chain uses download_count then sold."""
        return int(self.sold or 0)

    @computed_field
    @property
    def imageUrl(self) -> Optional[str]:
        """Confirmation page reads order.product.imageUrl."""
        return self.image_url

    @computed_field
    @property
    def originalPrice(self) -> Optional[float]:
        return self.original_price

    @computed_field
    @property
    def discountEndDate(self) -> Optional[datetime]:
        return self.offer_end_date

    @computed_field
    @property
    def offerEndDate(self) -> Optional[datetime]:
        return self.offer_end_date

    @computed_field
    @property
    def purchaseCount(self) -> int:
        return int(self.purchase_count or 0)

    @computed_field
    @property
    def createdAt(self) -> datetime:
        return self.created_at

    @computed_field
    @property
    def updatedAt(self) -> Optional[datetime]:
        return self.updated_at


class ProductDetailResponse(ProductResponse):
    """Single product with engagement stats; Authorization header sets liked_by_me when logged in."""

    like_count: int = 0
    review_count: int = 0
    liked_by_me: Optional[bool] = None


def product_payload_to_orm_dict(data: dict) -> dict:
    """Turn API/create dict into SQLAlchemy Product constructor kwargs."""
    out = dict(data)
    if "format" in out:
        out["content_format"] = out.pop("format")
    return out
