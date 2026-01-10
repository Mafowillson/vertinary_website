from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.config import SiteConfig
from app.schemas.config import SiteConfigResponse, SocialLinksUpdate
from app.api.dependencies import get_current_admin_user
from app.models.user import User

router = APIRouter()

def get_or_create_config(db: Session) -> SiteConfig:
    """Get or create site configuration."""
    config = db.query(SiteConfig).first()
    if not config:
        config = SiteConfig()
        db.add(config)
        db.commit()
        db.refresh(config)
    return config

@router.get("", response_model=SiteConfigResponse)
async def get_site_config(
    db: Session = Depends(get_db)
):
    """Get site configuration."""
    config = get_or_create_config(db)
    return SiteConfigResponse.model_validate(config)

@router.put("/social-links", response_model=SiteConfigResponse)
async def update_social_links(
    links: SocialLinksUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update social links (admin only)."""
    config = get_or_create_config(db)
    
    if links.whatsapp is not None:
        if not config.social_links:
            config.social_links = {}
        config.social_links["whatsapp"] = links.whatsapp
    
    if links.facebook is not None:
        if not config.social_links:
            config.social_links = {}
        config.social_links["facebook"] = links.facebook
    
    db.commit()
    db.refresh(config)
    return SiteConfigResponse.model_validate(config)

