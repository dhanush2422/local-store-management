# Frontend - Store Management System

React frontend for the Local Store Management System.

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## Pages

- **Dashboard** (`/`) - Overview with statistics and recent products
- **Product List** (`/products`) - View, search, edit, and delete products
- **Add Product** (`/add-product`) - Add new products to inventory
- **Edit Product** (`/edit-product/:id`) - Update existing products
- **Sales** (`/sales`) - Process sales and view sales history

## Components

- **Navbar** - Navigation component with routing

## Features

- Real-time product search
- Form validation
- Error handling
- Success/error messages
- Responsive design
- Low stock alerts
- Auto-refresh after operations

## Dependencies

- React 18
- React Router DOM
- Axios
- React Scripts

## Proxy Configuration

The frontend is configured to proxy API requests to `http://localhost:5000` (backend server).
