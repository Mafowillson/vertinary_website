import logging
import smtplib
from email.message import EmailMessage
from urllib.parse import quote

from app.core.config import settings

logger = logging.getLogger(__name__)


class EmailNotConfiguredError(ValueError):
    """SMTP is required but credentials or mode are not set correctly."""


def build_verification_link(token: str) -> str:
    return f"{settings.VERIFICATION_URL_BASE}?token={quote(token)}"


def send_verification_email(recipient_email: str, token: str) -> None:
    """Send or log account verification (see VERIFICATION_EMAIL_MODE)."""
    verification_link = build_verification_link(token)

    mode = (settings.VERIFICATION_EMAIL_MODE or "smtp").strip().lower()
    if mode == "console":
        logger.warning(
            "VERIFICATION_EMAIL_MODE=console — verification link for %s:\n%s",
            recipient_email,
            verification_link,
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

    message = EmailMessage()
    message["Subject"] = "Verify your Vertinary account"
    message["From"] = settings.SMTP_FROM_EMAIL
    message["To"] = recipient_email
    message.set_content(
        (
            "Welcome to Académie des Éleveurs!\n\n"
            "Please verify your email by clicking the link below:\n"
            f"{verification_link}\n\n"
            "This link expires in 24 hours.\n"
            "If you did not create this account, you can ignore this email."
        )
    )

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
