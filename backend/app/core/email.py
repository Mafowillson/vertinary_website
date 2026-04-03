import logging
import smtplib
from email.message import EmailMessage
from urllib.parse import quote

from app.core.config import settings
from app.i18n import get_translation

logger = logging.getLogger(__name__)


class EmailNotConfiguredError(ValueError):
    """SMTP is required but credentials or mode are not set correctly."""


def build_verification_link(token: str) -> str:
    return f"{settings.VERIFICATION_URL_BASE}?token={quote(token)}"


def build_password_reset_link(token: str) -> str:
    return f"{settings.PASSWORD_RESET_URL_BASE}?token={quote(token)}"


def send_verification_email(
    recipient_email: str,
    token: str,
    *,
    name: str,
    lang: str = "en",
) -> None:
    """Send or log account verification (see VERIFICATION_EMAIL_MODE)."""
    effective_lang = lang or "en"
    verification_link = build_verification_link(token)

    mode = (settings.VERIFICATION_EMAIL_MODE or "smtp").strip().lower()
    if mode == "console":
        body_preview = get_translation(
            "emails.verify_body",
            lang=effective_lang,
            name=name,
            link=verification_link,
        )
        logger.warning(
            "VERIFICATION_EMAIL_MODE=console — verification for %s (%s):\n%s",
            recipient_email,
            effective_lang,
            body_preview,
        )
        return

    if mode != "smtp":
        raise EmailNotConfiguredError(
            f"Unknown VERIFICATION_EMAIL_MODE={settings.VERIFICATION_EMAIL_MODE!r}. "
            "Use smtp or console."
        )

    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        raise EmailNotConfiguredError(
            "SMTP is not configured: set SMTP_USERNAME and SMTP_PASSWORD in .env, "
            "or set VERIFICATION_EMAIL_MODE=console for local development (link is printed to server logs)."
        )

    subject = get_translation("emails.verify_subject", lang=effective_lang)
    body = get_translation(
        "emails.verify_body",
        lang=effective_lang,
        name=name,
        link=verification_link,
    )

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.SMTP_FROM_EMAIL
    message["To"] = recipient_email
    message.set_content(body)

    port = settings.SMTP_PORT
    if port == 465:
        with smtplib.SMTP_SSL(settings.SMTP_HOST, port, timeout=30) as smtp:
            smtp.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            smtp.send_message(message)
        return

    with smtplib.SMTP(settings.SMTP_HOST, port, timeout=30) as smtp:
        smtp.starttls()
        smtp.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        smtp.send_message(message)


def send_password_reset_email(
    recipient_email: str,
    token: str,
    *,
    name: str,
    lang: str = "en",
) -> None:
    """Send or log password reset link (same modes as verification email)."""
    effective_lang = lang or "en"
    reset_link = build_password_reset_link(token)

    mode = (settings.VERIFICATION_EMAIL_MODE or "smtp").strip().lower()
    if mode == "console":
        body_preview = get_translation(
            "emails.reset_body",
            lang=effective_lang,
            name=name,
            link=reset_link,
        )
        logger.warning(
            "VERIFICATION_EMAIL_MODE=console — password reset for %s (%s):\n%s",
            recipient_email,
            effective_lang,
            body_preview,
        )
        return

    if mode != "smtp":
        raise EmailNotConfiguredError(
            f"Unknown VERIFICATION_EMAIL_MODE={settings.VERIFICATION_EMAIL_MODE!r}. "
            "Use smtp or console."
        )

    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        raise EmailNotConfiguredError(
            "SMTP is not configured: set SMTP_USERNAME and SMTP_PASSWORD in .env, "
            "or set VERIFICATION_EMAIL_MODE=console for local development (link is printed to server logs)."
        )

    subject = get_translation("emails.reset_subject", lang=effective_lang)
    body = get_translation(
        "emails.reset_body",
        lang=effective_lang,
        name=name,
        link=reset_link,
    )

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.SMTP_FROM_EMAIL
    message["To"] = recipient_email
    message.set_content(body)

    port = settings.SMTP_PORT
    if port == 465:
        with smtplib.SMTP_SSL(settings.SMTP_HOST, port, timeout=30) as smtp:
            smtp.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            smtp.send_message(message)
        return

    with smtplib.SMTP(settings.SMTP_HOST, port, timeout=30) as smtp:
        smtp.starttls()
        smtp.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        smtp.send_message(message)
