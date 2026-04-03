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
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
)
from app.schemas.user import UserResponse
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.core.email import (
    EmailNotConfiguredError,
    send_verification_email,
    send_password_reset_email,
)
from app.core.config import settings
from app.api.dependencies import get_current_user
from app.dependencies.locale import get_locale
from app.i18n import get_translation

logger = logging.getLogger(__name__)

router = APIRouter()
EMAIL_VERIFICATION_EXPIRE_HOURS = 24
PASSWORD_RESET_EXPIRE_HOURS = 1


def _as_utc(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


def _email_lang(user: User | None, locale: str) -> str:
    if user is not None and getattr(user, "preferred_language", None):
        return user.preferred_language
    return locale


@router.post("/register", response_model=RegisterResponse)
async def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    """Register a new user."""
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.email_registered", lang=locale),
        )

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
        preferred_language=locale,
    )
    db.add(db_user)
    db.flush()
    try:
        send_verification_email(
            db_user.email,
            verification_token,
            name=user_data.name,
            lang=locale,
        )
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
            detail=get_translation("errors.email_delivery_verification", lang=locale),
        )
    db.commit()
    db.refresh(db_user)

    return RegisterResponse(
        message=get_translation("success.register_complete", lang=locale),
        email=db_user.email,
    )


@router.post("/verify-email")
async def verify_email(
    payload: EmailVerificationRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
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
            detail=get_translation("errors.invalid_verification_token", lang=locale),
        )

    if user.is_verified:
        return {"message": get_translation("success.email_already_verified", lang=locale)}

    expires_at = _as_utc(user.email_verification_expires_at)
    if not expires_at or expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.verification_expired", lang=locale),
        )

    user.is_verified = True
    user.email_verification_token = None
    user.email_verification_expires_at = None
    db.commit()

    return {"message": get_translation("success.email_verified", lang=locale)}


@router.post("/resend-verification-email")
async def resend_verification_email(
    payload: ResendVerificationRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    """Resend email verification link for unverified users."""
    user = db.query(User).filter(User.email == payload.email).first()
    generic_message = get_translation("success.resend_verification_generic", lang=locale)
    generic_response = {"message": generic_message}

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
                detail=get_translation(
                    "errors.rate_limit_verification",
                    lang=locale,
                    seconds=retry_after_seconds,
                ),
                headers={"Retry-After": str(retry_after_seconds)},
            )

    verification_token = secrets.token_urlsafe(32)
    verification_expiry = now_utc + timedelta(hours=EMAIL_VERIFICATION_EXPIRE_HOURS)

    user.email_verification_token = verification_token
    user.email_verification_expires_at = verification_expiry
    user.verification_email_last_sent_at = now_utc

    mail_lang = _email_lang(user, locale)
    try:
        send_verification_email(
            user.email,
            verification_token,
            name=user.name,
            lang=mail_lang,
        )
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
            detail=get_translation("errors.email_delivery_verification_short", lang=locale),
        )

    db.commit()
    return generic_response


@router.post("/forgot-password", response_model=ForgotPasswordResponse)
async def forgot_password(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    """Request a password reset email. Response is generic to avoid email enumeration."""
    user = db.query(User).filter(User.email == payload.email).first()
    response = ForgotPasswordResponse(
        message=get_translation("success.forgot_password_generic", lang=locale),
    )

    if not user or not user.is_active:
        return response

    last_sent_at = _as_utc(user.password_reset_email_last_sent_at)
    now_utc = datetime.now(timezone.utc)
    if last_sent_at:
        cooldown_deadline = last_sent_at + timedelta(
            seconds=settings.VERIFICATION_RESEND_COOLDOWN_SECONDS
        )
        if now_utc < cooldown_deadline:
            retry_after_seconds = int((cooldown_deadline - now_utc).total_seconds())
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=get_translation(
                    "errors.rate_limit_reset",
                    lang=locale,
                    seconds=retry_after_seconds,
                ),
                headers={"Retry-After": str(retry_after_seconds)},
            )

    reset_token = secrets.token_urlsafe(32)
    reset_expiry = now_utc + timedelta(hours=PASSWORD_RESET_EXPIRE_HOURS)
    user.password_reset_token = reset_token
    user.password_reset_expires_at = reset_expiry
    user.password_reset_email_last_sent_at = now_utc

    mail_lang = _email_lang(user, locale)
    try:
        send_password_reset_email(
            user.email,
            reset_token,
            name=user.name,
            lang=mail_lang,
        )
    except EmailNotConfiguredError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        )
    except Exception:
        logger.exception("Password reset email send failed")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=get_translation("errors.email_delivery_reset", lang=locale),
        )

    db.commit()
    return response


@router.post("/reset-password")
async def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    """Set a new password using a token from the reset email."""
    user = (
        db.query(User).filter(User.password_reset_token == payload.token).first()
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.invalid_reset_token", lang=locale),
        )

    expires_at = _as_utc(user.password_reset_expires_at)
    if not expires_at or expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.invalid_reset_token", lang=locale),
        )

    user.hashed_password = get_password_hash(payload.password)
    user.password_reset_token = None
    user.password_reset_expires_at = None
    db.commit()

    return {"message": get_translation("success.password_updated", lang=locale)}


@router.post("/login", response_model=AuthResponse)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    """Login and get access token."""
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=get_translation("errors.invalid_credentials", lang=locale),
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.inactive_user", lang=locale),
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.email_not_verified", lang=locale),
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires,
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
async def refresh_tokens(
    payload: RefreshRequest,
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    """Exchange a valid refresh JWT for a new access JWT."""
    decoded = decode_refresh_token(payload.refresh_token)
    if not decoded:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=get_translation("errors.invalid_refresh", lang=locale),
            headers={"WWW-Authenticate": "Bearer"},
        )
    email = decoded.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=get_translation("errors.invalid_refresh_sub", lang=locale),
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(User).filter(User.email == email).first()
    if not user:
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
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.email_not_verified_short", lang=locale),
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role.value},
        expires_delta=access_token_expires,
    )
    return RefreshResponse(token=access_token)


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user),
):
    """Get current user information."""
    return UserResponse.model_validate(current_user)
