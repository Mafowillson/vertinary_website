from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User, UserRole
from app.core.security import decode_access_token
from app.dependencies.locale import get_locale
from app.i18n import get_translation

security = HTTPBearer()
optional_security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
) -> User:
    """Get the current authenticated user."""
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=get_translation("errors.credentials_invalid", lang=locale),
            headers={"WWW-Authenticate": "Bearer"},
        )
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=get_translation("errors.credentials_invalid", lang=locale),
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=get_translation("errors.user_not_found", lang=locale),
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.inactive_user", lang=locale),
        )
    return user


async def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(optional_security),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """Bearer token present and valid → user; otherwise None (no 401)."""
    if credentials is None:
        return None
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        return None
    email: Optional[str] = payload.get("sub")
    if email is None:
        return None
    user = db.query(User).filter(User.email == email).first()
    if user is None or not user.is_active:
        return None
    return user


async def get_current_admin_user(
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
) -> User:
    """Get the current user and verify they are an admin."""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.not_enough_permissions", lang=locale),
        )
    return current_user

