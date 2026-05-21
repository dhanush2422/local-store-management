# Backend - Store Management System

Backend API for the Local Store Management System built with Node.js, Express.js, and MongoDB.

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running on your system

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/sell/:id` - Sell product (reduce stock)

### Health Check
- `GET /health` - Check server status

## Environment Variables

Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/store_management
```

## Project Structure

```
backend/
├── models/
│   └── Product.js          # MongoDB schema
├── controllers/
│   └── productController.js # Business logic
├── routes/
│   └── productRoutes.js    # API routes
├── .env                    # Environment variables
├── package.json            # Dependencies
└── server.js               # Server setup
```

## Features

- Auto-generated product IDs
- Stock validation
- Error handling
- CORS enabled
- MVC architecture
