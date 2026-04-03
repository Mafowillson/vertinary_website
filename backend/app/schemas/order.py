from pydantic import BaseModel, ConfigDict, Field, computed_field, model_validator
from typing import Optional, Any, Dict
from datetime import datetime
from app.schemas.product import ProductResponse


class UserOrderSummary(BaseModel):
    """Nested user on order responses (admin + confirmation pages)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str


class OrderBase(BaseModel):
    product_id: int
    amount: float


class OrderCreate(OrderBase):
    pass


class PaymentRequest(BaseModel):
    """
    Frontend CheckoutPage sends camelCase (paymentMethod, paymentProvider, ...).
    """

    model_config = ConfigDict(populate_by_name=True)

    payment_method: str = Field(..., alias="paymentMethod")
    payment_provider: Optional[str] = Field(None, alias="paymentProvider")
    payment_data: Optional[Dict[str, Any]] = Field(None, alias="paymentData")
    email: Optional[str] = Field(None, alias="email")


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

    id: int
    order_number: str
    user_id: int
    product_id: int
    product: Optional[ProductResponse] = None
    user: Optional[UserOrderSummary] = None
    amount: float
    status: str
    payment_method: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    @model_validator(mode="before")
    @classmethod
    def map_order_orm(cls, data: Any) -> Any:
        if data is None or isinstance(data, dict):
            return data
        if hasattr(data, "order_number"):
            u = getattr(data, "user", None)
            user_payload = None
            if u is not None:
                user_payload = {
                    "id": u.id,
                    "name": u.name,
                    "email": u.email,
                }
            pm = data.payment_method
            pm_val = pm.value if pm is not None and hasattr(pm, "value") else pm
            st = data.status
            st_val = st.value if st is not None and hasattr(st, "value") else st
            return {
                "id": data.id,
                "order_number": data.order_number,
                "user_id": data.user_id,
                "product_id": data.product_id,
                "product": data.product,
                "user": user_payload,
                "amount": data.amount,
                "status": st_val,
                "payment_method": pm_val,
                "created_at": data.created_at,
                "updated_at": data.updated_at,
            }
        return data

    @computed_field
    @property
    def orderNumber(self) -> str:
        """Frontend PurchaseConfirmation copies orderNumber."""
        return self.order_number

    @computed_field
    @property
    def total(self) -> float:
        """Frontend uses amount || total."""
        return float(self.amount)

    @computed_field
    @property
    def paymentMethod(self) -> Optional[str]:
        return self.payment_method

    @computed_field
    @property
    def createdAt(self) -> datetime:
        return self.created_at

    @computed_field
    @property
    def updatedAt(self) -> Optional[datetime]:
        return self.updated_at

    @computed_field
    @property
    def productId(self) -> int:
        return self.product_id

    @computed_field
    @property
    def userId(self) -> int:
        return self.user_id


class PaymentResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    order: Optional[OrderResponse] = None

