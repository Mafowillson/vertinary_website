from pydantic import BaseModel
from typing import Dict, Optional

class SocialLinks(BaseModel):
    whatsapp: Optional[str] = ""
    facebook: Optional[str] = ""

class SiteConfigResponse(BaseModel):
    site_name: str
    currency: str
    currency_symbol: str
    social_links: Dict[str, str]

    class Config:
        from_attributes = True

class SocialLinksUpdate(BaseModel):
    whatsapp: Optional[str] = None
    facebook: Optional[str] = None

