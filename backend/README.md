# Vertinary Website Backend

FastAPI backend for L'Académie DES Éleveurs e-commerce platform.

## Features

- **Authentication**: JWT-based authentication with user roles (user/admin)
- **Products**: CRUD operations for products with search and filtering
- **Orders**: Order management with payment processing
- **Downloads**: Secure file download system for purchased products
- **Admin Dashboard**: Analytics and management endpoints
- **Configuration**: Site configuration and social links management

## Tech Stack

- **FastAPI**: Modern, fast web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: ORM for database operations
- **Alembic**: Database migrations
- **JWT**: Token-based authentication
- **Pydantic**: Data validation

## Setup

### Prerequisites

- Python 3.9+
- PostgreSQL 12+
- pip

### Installation

1. **Clone the repository and navigate to backend:**

```bash
cd backend
```

2. **Create a virtual environment:**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**

```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/vertinary_db
SECRET_KEY=your-secret-key-here-change-in-production
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

5. **Create the database:**

```bash
createdb vertinary_db
```

Or using PostgreSQL client:

```sql
CREATE DATABASE vertinary_db;
```

6. **Initialize the database:**

```bash
python scripts/init_db.py
```

This will:
- Create all database tables
- Create a default admin user (email: `admin@example.com`, password: `admin123`)
- Create default site configuration

**⚠️ IMPORTANT**: Change the default admin password in production!

7. **Run database migrations (optional, if using Alembic):**

```bash
alembic upgrade head
```

## Running the Server

### Development

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Production

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the server is running, you can access:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all products (with pagination and filters)
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/{id}` - Update product (admin only)
- `DELETE /api/products/{id}` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/my-orders` - Get user's orders
- `POST /api/orders/{id}/payment` - Process payment

### Downloads
- `GET /api/downloads/{order_id}` - Get download files for order
- `GET /api/downloads/{order_id}/files/{file_id}` - Download file

### Configuration
- `GET /api/config` - Get site configuration
- `PUT /api/config/social-links` - Update social links (admin only)

### Admin
- `GET /api/admin/analytics` - Get analytics statistics (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

## Database Models

- **User**: Users with roles (user/admin)
- **Product**: Products with pricing, stock, and metadata
- **Order**: Orders with status and payment information
- **OrderFile**: Files associated with orders for download
- **SiteConfig**: Site-wide configuration and settings

## File Uploads

Uploaded files are stored in the `uploads/` directory (configurable via `UPLOAD_DIR` in `.env`).

Make sure to create the uploads directory:

```bash
mkdir uploads
```

## Security Notes

1. **Change default admin password** in production
2. **Use a strong SECRET_KEY** for JWT tokens
3. **Configure CORS_ORIGINS** properly for your frontend
4. **Use HTTPS** in production
5. **Set proper file permissions** for uploads directory

## Development

### Running Tests

```bash
pytest
```

### Database Migrations

Create a new migration:

```bash
alembic revision --autogenerate -m "Description"
```

Apply migrations:

```bash
alembic upgrade head
```

Rollback:

```bash
alembic downgrade -1
```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── orders.py
│   │   │   ├── downloads.py
│   │   │   ├── config.py
│   │   │   └── admin.py
│   │   └── dependencies.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── db/
│   │   └── database.py
│   ├── models/
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   └── config.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── auth.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── download.py
│   │   └── config.py
│   └── main.py
├── alembic/
├── scripts/
│   └── init_db.py
├── requirements.txt
├── alembic.ini
└── README.md
```

## License

This project is part of the Vertinary Website application.

