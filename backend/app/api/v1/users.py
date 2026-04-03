from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserLanguageUpdate
from app.i18n import get_translation

router = APIRouter()


@router.patch("/me/language")
async def update_user_language(
    payload: UserLanguageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    current_user.preferred_language = payload.language
    db.commit()
    db.refresh(current_user)
    return {"message": get_translation("success.language_updated", lang=payload.language)}
