"""
Initialize the database with default data.
Run this script after creating the database to set up initial data.
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.models.config import SiteConfig
from app.core.security import get_password_hash

def init_db():
    """Initialize database with default data."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Create default admin user if it doesn't exist
        admin_email = "admin@example.com"
        admin_user = db.query(User).filter(User.email == admin_email).first()
        
        if not admin_user:
            admin_user = User(
                name="Admin User",
                email=admin_email,
                hashed_password=get_password_hash("admin123"),  # Change this in production!
                role=UserRole.ADMIN,
                is_active=True
            )
            db.add(admin_user)
            print(f"✓ Created admin user: {admin_email} / admin123")
        else:
            print(f"✓ Admin user already exists: {admin_email}")
        
        # Create default site config if it doesn't exist
        config = db.query(SiteConfig).first()
        if not config:
            config = SiteConfig(
                site_name="L'Académie DES Éleveurs",
                currency="FCFA",
                currency_symbol="FCFA",
                social_links={
                    "whatsapp": "https://wa.me/237699933135",
                    "facebook": "https://web.facebook.com/search/top?q=l%27acad%C3%A9mie%20des%20%C3%A9leveurs"
                }
            )
            db.add(config)
            print("✓ Created default site configuration")
        else:
            print("✓ Site configuration already exists")
        
        db.commit()
        print("\n✓ Database initialized successfully!")
        print("\n⚠️  IMPORTANT: Change the default admin password in production!")
        
    except Exception as e:
        db.rollback()
        print(f"✗ Error initializing database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_db()

