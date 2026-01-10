from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from app.db.database import Base

class SiteConfig(Base):
    __tablename__ = "site_config"

    id = Column(Integer, primary_key=True, index=True)
    site_name = Column(String, default="L'Académie DES Éleveurs", nullable=False)
    currency = Column(String, default="FCFA", nullable=False)
    currency_symbol = Column(String, default="FCFA", nullable=False)
    social_links = Column(JSON, default={"whatsapp": "", "facebook": ""})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

