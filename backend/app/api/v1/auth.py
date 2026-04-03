import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime, timezone
import secrets
from app.db.database import get_db
from app.models.user import User, UserRole
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    RegisterResponse,
    EmailVerificationRequest,
    ResendVerificationRequest,
    AuthResponse,
    RefreshRequest,
    RefreshResponse,
)
from app.schemas.user import UserResponse
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.core.email import EmailNotConfiguredError, send_verification_email
from app.core.config import settings
from app.api.dependencies import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter()
EMAIL_VERIFICATION_EXPIRE_HOURS = 24


def _as_utc(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


@router.post("/register", response_model=RegisterResponse)
async def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db)
):
    """Register a new user."""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user and require email verification before login.
    verification_token = secrets.token_urlsafe(32)
    verification_expiry = datetime.now(timezone.utc) + timedelta(
        hours=EMAIL_VERIFICATION_EXPIRE_HOURS
    )
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password,
        role=UserRole.USER,
        is_verified=False,
        email_verification_token=verification_token,
        email_verification_expires_at=verification_expiry,
        verification_email_last_sent_at=datetime.now(timezone.utc),
    )
    db.add(db_user)
    db.flush()
    try:
        send_verification_email(db_user.email, verification_token)
    except EmailNotConfiguredError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        )
    except Exception:
        logger.exception("Verification email send failed")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                "Could not deliver verification email. Check SMTP host, port (587 STARTTLS or 465 SSL), "
                "and credentials (e.g. Gmail needs an app password). The server log has the provider error."
            ),
        )
    db.commit()
    db.refresh(db_user)

    return RegisterResponse(
        message="Registration successful. Please verify your email before logging in.",
        email=db_user.email,
    )


@router.post("/verify-email")
async def verify_email(
    payload: EmailVerificationRequest,
    db: Session = Depends(get_db),
):
    """Verify a user's email using a time-limited verification token."""
    user = (
        db.query(User)
        .filter(User.email_verification_token == payload.token)
        .first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification token",
        )

    if user.is_verified:
        return {"message": "Email already verified"}

    expires_at = _as_utc(user.email_verification_expires_at)
    if not expires_at or expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification token has expired",
        )

    user.is_verified = True
    user.email_verification_token = None
    user.email_verification_expires_at = None
    db.commit()

    return {"message": "Email verified successfully. You can now log in."}


@router.post("/resend-verification-email")
async def resend_verification_email(
    payload: ResendVerificationRequest,
    db: Session = Depends(get_db),
):
    """Resend email verification link for unverified users."""
    user = db.query(User).filter(User.email == payload.email).first()
    generic_response = {
        "message": "If this account exists and is not verified, a verification email has been sent."
    }

    if not user or user.is_verified:
        return generic_response

    last_sent_at = _as_utc(user.verification_email_last_sent_at)
    now_utc = datetime.now(timezone.utc)
    if last_sent_at:
        cooldown_deadline = last_sent_at + timedelta(
            seconds=settings.VERIFICATION_RESEND_COOLDOWN_SECONDS
        )
        if now_utc < cooldown_deadline:
            retry_after_seconds = int((cooldown_deadline - now_utc).total_seconds())
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Please wait {retry_after_seconds}s before requesting another verification email.",
                headers={"Retry-After": str(retry_after_seconds)},
            )

    verification_token = secrets.token_urlsafe(32)
    verification_expiry = now_utc + timedelta(
        hours=EMAIL_VERIFICATION_EXPIRE_HOURS
    )

    user.email_verification_token = verification_token
    user.email_verification_expires_at = verification_expiry
    user.verification_email_last_sent_at = now_utc

    try:
        send_verification_email(user.email, verification_token)
    except EmailNotConfiguredError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        )
    except Exception:
        logger.exception("Verification email resend failed")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                "Could not deliver verification email. Check SMTP settings and see server logs."
            ),
        )

    db.commit()
    return generic_response


@router.post("/login", response_model=AuthResponse)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """Login and get access token."""
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified. Please verify your email before logging in.",
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires
    )
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = create_refresh_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=refresh_token_expires,
    )

    return AuthResponse(
        token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user).model_dump(),
    )


@router.post("/refresh", response_model=RefreshResponse)
async def refresh_tokens(payload: RefreshRequest, db: Session = Depends(get_db)):
    """Exchange a valid refresh JWT for a new access JWT."""
    decoded = decode_refresh_token(payload.refresh_token)
    if not decoded:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email = decoded.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user",
        )
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires,
    )
    return RefreshResponse(token=access_token)


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current user information."""
    return UserResponse.model_validate(current_user)

