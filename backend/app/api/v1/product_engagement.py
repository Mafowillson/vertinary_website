from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from typing import List

from app.db.database import get_db
from app.models.product import Product
from app.models.review import Review
from app.models.product_like import ProductLike
from app.models.user import User, UserRole
from app.api.dependencies import get_current_user
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from app.dependencies.locale import get_locale
from app.i18n import get_translation

router = APIRouter()


def _product_or_404(db: Session, product_id: int, locale: str) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.product_not_found", lang=locale),
        )
    return product


def _review_to_response(review: Review) -> ReviewResponse:
    return ReviewResponse(
        id=review.id,
        product_id=review.product_id,
        user_id=review.user_id,
        user_name=review.user.name,
        body=review.body,
        rating=review.rating,
        created_at=review.created_at,
        updated_at=review.updated_at,
    )


def _like_count(db: Session, product_id: int) -> int:
    return db.query(func.count(ProductLike.id)).filter(ProductLike.product_id == product_id).scalar() or 0


@router.get("/{product_id}/reviews", response_model=List[ReviewResponse])
async def list_reviews(
    product_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    locale: str = Depends(get_locale),
):
    _product_or_404(db, product_id, locale)
    reviews = (
        db.query(Review)
        .options(joinedload(Review.user))
        .filter(Review.product_id == product_id)
        .order_by(Review.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return [_review_to_response(r) for r in reviews]


@router.post(
    "/{product_id}/reviews",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_review(
    product_id: int,
    data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    _product_or_404(db, product_id, locale)
    review = Review(
        product_id=product_id,
        user_id=current_user.id,
        body=data.body,
        rating=data.rating,
    )
    db.add(review)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=get_translation("errors.review_exists", lang=locale),
        )
    db.refresh(review)
    review = db.query(Review).options(joinedload(Review.user)).filter(Review.id == review.id).first()
    return _review_to_response(review)


@router.patch("/{product_id}/reviews/{review_id}", response_model=ReviewResponse)
async def update_review(
    product_id: int,
    review_id: int,
    data: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    _product_or_404(db, product_id, locale)
    review = (
        db.query(Review)
        .options(joinedload(Review.user))
        .filter(Review.id == review_id, Review.product_id == product_id)
        .first()
    )
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.review_not_found", lang=locale),
        )
    if review.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.review_edit_forbidden", lang=locale),
        )

    patch = data.model_dump(exclude_unset=True)
    if not patch:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=get_translation("errors.review_no_updates", lang=locale),
        )
    for key, value in patch.items():
        setattr(review, key, value)
    db.commit()
    db.refresh(review)
    return _review_to_response(review)


@router.delete("/{product_id}/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(
    product_id: int,
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    _product_or_404(db, product_id, locale)
    review = db.query(Review).filter(Review.id == review_id, Review.product_id == product_id).first()
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=get_translation("errors.review_not_found", lang=locale),
        )
    if review.user_id != current_user.id and current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=get_translation("errors.review_delete_forbidden", lang=locale),
        )
    db.delete(review)
    db.commit()
    return None


@router.post("/{product_id}/like", status_code=status.HTTP_201_CREATED)
async def like_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    _product_or_404(db, product_id, locale)
    existing = (
        db.query(ProductLike)
        .filter(ProductLike.product_id == product_id, ProductLike.user_id == current_user.id)
        .first()
    )
    if existing:
        return {"liked": True, "like_count": _like_count(db, product_id)}
    like = ProductLike(product_id=product_id, user_id=current_user.id)
    db.add(like)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
    return {"liked": True, "like_count": _like_count(db, product_id)}


@router.delete("/{product_id}/like", status_code=status.HTTP_200_OK)
async def unlike_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    locale: str = Depends(get_locale),
):
    _product_or_404(db, product_id, locale)
    db.query(ProductLike).filter(
        ProductLike.product_id == product_id,
        ProductLike.user_id == current_user.id,
    ).delete()
    db.commit()
    return {"liked": False, "like_count": _like_count(db, product_id)}
