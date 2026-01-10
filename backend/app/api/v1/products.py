from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.api.dependencies import get_current_user, get_current_admin_user
from app.models.user import User

router = APIRouter()

@router.get("", response_model=List[ProductResponse])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    """Get all products with optional filtering."""
    query = db.query(Product)
    
    if search:
        query = query.filter(
            Product.title.ilike(f"%{search}%") |
            Product.description.ilike(f"%{search}%")
        )
    
    if featured is not None:
        query = query.filter(Product.featured == featured)
    
    products = query.offset(skip).limit(limit).all()
    return [ProductResponse.model_validate(p) for p in products]

@router.get("/search", response_model=List[ProductResponse])
async def search_products(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    """Search products by query."""
    products = db.query(Product).filter(
        Product.title.ilike(f"%{q}%") |
        Product.description.ilike(f"%{q}%")
    ).all()
    return [ProductResponse.model_validate(p) for p in products]

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """Get a product by ID."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return ProductResponse.model_validate(product)

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new product (admin only)."""
    db_product = Product(**product_data.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return ProductResponse.model_validate(db_product)

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update a product (admin only)."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    update_data = product_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    return ProductResponse.model_validate(product)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a product (admin only)."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    return None

