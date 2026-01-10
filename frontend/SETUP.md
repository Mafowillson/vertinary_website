# Veterinary Knowledge Marketplace - Frontend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Backend API running on `http://localhost:8000` (for development)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp .env.example .env
```

Edit `.env` and set:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

3. **Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Admin/          # Admin-specific components
│   ├── CountdownTimer/ # Countdown timer component
│   ├── CurrencySelector/ # Currency selector
│   ├── Layout/         # Header, Footer, Layout
│   ├── PaymentMethods/ # Payment method icons
│   └── ProductCard/    # Product card component
├── contexts/           # React contexts (Auth, App)
├── pages/              # Page components
│   ├── Admin/          # Admin dashboard pages
│   ├── Auth/           # Login/Register pages
│   └── ...             # Other pages
├── services/           # API service layer
├── utils/             # Utility functions
└── styles/             # Global styles
```

## 🎨 Features Implemented

### ✅ Core Features
- ✅ User authentication (Login/Register)
- ✅ Product browsing and search
- ✅ Product detail pages with countdown timers
- ✅ Shopping cart and checkout flow
- ✅ Purchase confirmation page
- ✅ Download page for purchased content
- ✅ Admin dashboard for content management
- ✅ Responsive mobile-first design
- ✅ WhatsApp and Facebook integration
- ✅ Currency selector
- ✅ Payment method display

### 📱 Pages

1. **HomePage** (`/`)
   - Hero section with call-to-action
   - Featured products grid
   - Benefits section

2. **ProductsPage** (`/products`)
   - Product listing with search
   - Product cards with pricing

3. **ProductDetailPage** (`/products/:id`)
   - Product details
   - Countdown timer for limited offers
   - Sales progress bar
   - Purchase button

4. **LoginPage** (`/login`)
   - Email/password authentication

5. **RegisterPage** (`/register`)
   - User registration form

6. **CheckoutPage** (`/checkout/:productId`)
   - Order summary
   - Payment method selection
   - Payment processing

7. **PurchaseConfirmationPage** (`/purchase-confirmation/:orderId`)
   - Order confirmation
   - Download link
   - WhatsApp support link

8. **DownloadPage** (`/download/:orderId`)
   - File listing
   - Download functionality
   - Support information

9. **AdminDashboard** (`/admin`)
   - Analytics overview
   - Product management
   - Order management
   - Settings (social links)

## 🔧 Configuration

### API Integration

The frontend expects the backend API to be available at the URL specified in `.env`:
- Default: `http://localhost:8000/api`

### Authentication

- Uses JWT tokens stored in localStorage
- Protected routes require authentication
- Admin routes require admin role

### Styling

- **Framework:** Tailwind CSS
- **Theme:** Custom primary (green) and accent (yellow) colors
- **Responsive:** Mobile-first approach

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- ESLint configured for React
- Prettier recommended (not enforced)
- Component-based architecture
- Service layer for API calls

## 📝 API Endpoints Expected

The frontend expects these backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/orders/:id/payment` - Process payment

### Downloads
- `GET /api/downloads/:orderId` - Get download files
- `GET /api/downloads/:orderId/files/:fileId` - Download file

### Config
- `GET /api/config` - Get site configuration
- `PUT /api/config/social-links` - Update social links (admin)

## 🚢 Deployment

1. **Build the application:**
```bash
npm run build
```

2. **The `dist/` folder contains the production build**

3. **Deploy to your hosting service:**
   - Vercel, Netlify, or any static hosting
   - Update `VITE_API_BASE_URL` in `.env` for production

## 📱 Mobile Optimization

The application is fully responsive and optimized for mobile devices:
- Touch-friendly buttons
- Mobile-first CSS
- Optimized images and assets
- Fast loading times

## 🔐 Security Notes

- JWT tokens stored in localStorage
- HTTPS required in production
- API endpoints should validate all requests
- CORS configured for API access

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running on correct port
- Check `VITE_API_BASE_URL` in `.env`
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage if tokens are corrupted
- Verify JWT token format
- Check backend authentication endpoints

### Build Issues
- Clear `node_modules` and reinstall
- Check Node.js version (18+)
- Verify all dependencies are installed

## 📚 Next Steps

1. **Backend Development:**
   - Implement FastAPI backend
   - Set up database (PostgreSQL/MySQL)
   - Implement authentication
   - Create API endpoints

2. **Integration:**
   - Connect frontend to backend
   - Test all API endpoints
   - Implement file upload for admin

3. **Enhancements:**
   - Add image upload functionality
   - Implement real payment gateway
   - Add email notifications
   - Implement file storage (S3/Cloud)

## 📞 Support

For issues or questions, refer to the main README.md or contact the development team.

