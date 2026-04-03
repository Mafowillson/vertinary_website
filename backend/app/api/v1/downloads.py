from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
from app.db.database import get_db
from app.models.order import Order, OrderFile
from app.schemas.download import DownloadFilesResponse, FileResponse as FileResponseSchema
from app.api.dependencies import get_current_user
from app.models.user import User
from app.core.config import settings
from app.dependencies.locale import get_locale
from app.i18n import get_translation

router = APIRouter()

@router.get("/{order_id}", response_model=DownloadFilesResponse)
async def get_download_files(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    """Get download files for an order."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.order_not_found", lang=locale),
        )
    
    # Check if user owns the order or is admin
    if order.user_id != current_user.id and current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.forbidden_download", lang=locale),
        )
    
    # Check if order is completed
    if order.status.value != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.payment_incomplete", lang=locale),
        )
    
    files = db.query(OrderFile).filter(OrderFile.order_id == order_id).all()
    return DownloadFilesResponse(
        files=[FileResponseSchema(
            id=f.id,
            name=f.file_name,
            size=f.file_size
        ) for f in files]
    )

@router.get("/{order_id}/files/{file_id}")
async def download_file(
    order_id: int,
    file_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    """Download a specific file."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.order_not_found", lang=locale),
        )
    
    # Check if user owns the order or is admin
    if order.user_id != current_user.id and current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.forbidden_download", lang=locale),
        )
    
    # Check if order is completed
    if order.status.value != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.payment_incomplete", lang=locale),
        )
    
    file_record = db.query(OrderFile).filter(
        OrderFile.id == file_id,
        OrderFile.order_id == order_id
    ).first()
    
    if not file_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.file_not_found", lang=locale),
        )
    
    file_path = os.path.join(settings.UPLOAD_DIR, file_record.file_path)
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.file_not_found_on_server", lang=locale),
        )
    
    return FileResponse(
        path=file_path,
        filename=file_record.file_name,
        media_type='application/pdf'
    )

