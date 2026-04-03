from pydantic import BaseModel, ConfigDict, model_validator
from typing import Dict, Optional, Any


class SiteConfigResponse(BaseModel):
    """camelCase keys for frontend AppContext (socialLinks, siteName, currencySymbol)."""

    model_config = ConfigDict(from_attributes=True)

    siteName: str
    currency: str
    currencySymbol: str
    socialLinks: Dict[str, str]

    @model_validator(mode="before")
    @classmethod
    def from_orm(cls, data: Any) -> Any:
        if isinstance(data, dict):
            return data
        if hasattr(data, "site_name"):
            links = dict(data.social_links or {})
            return {
                "siteName": data.site_name,
                "currency": data.currency,
                "currencySymbol": data.currency_symbol,
                "socialLinks": links,
            }
        return data


class SocialLinksUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    whatsapp: Optional[str] = None
    facebook: Optional[str] = None
    youtube: Optional[str] = None
