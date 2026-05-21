# Local Store Management System

A full-stack web application for managing local store inventory, products, and sales.

## Features

### Product Management
- Add new products with auto-generated IDs
- View all products in table format
- Update product details
- Delete products
- Search products by name

### Inventory Management
- Real-time stock tracking
- Low stock alerts (quantity < 10)
- Automatic stock updates after sales
- Total product count display

### Sales Management
- Process sales with quantity validation
- Automatic stock reduction
- Prevent sales when out of stock
- Calculate total sales amount

### Dashboard
- Total products overview
- Total stock available
- Low stock products count
- Total sales value
- Recent products display

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- REST API architecture
- MVC pattern

### Frontend
- **React.js** with functional components
- **React Router** for navigation
- **Axios** for API calls
- Responsive CSS design

## Project Structure

```
local store managment/
├── backend/
│   ├── models/
│   │   └── Product.js          # Product schema
│   ├── controllers/
│   │   └── productController.js # Business logic
│   ├── routes/
│   │   └── productRoutes.js    # API routes
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Server entry point
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js       # Navigation component
│   │   ├── pages/
│   │   │   ├── Dashboard.js    # Dashboard page
│   │   │   ├── ProductList.js  # Product listing
│   │   │   ├── AddProduct.js   # Add product form
│   │   │   ├── EditProduct.js  # Edit product form
│   │   │   └── SalesPage.js    # Sales management
│   │   ├── App.js              # Main app component
│   │   ├── App.css             # Global styles
│   │   ├── index.js            # App entry point
│   │   └── index.css           # Base styles
│   └── package.json            # Frontend dependencies
└── README.md                   # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### 1. Clone/Download the Project
Navigate to the project directory:
```bash
cd "c:/Users/dhanu/local store managment"
```

### 2. Backend Setup

Navigate to backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create `.env` file (already created) with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/store_management
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/sell/:id` - Sell product (reduce stock)

### Health Check
- `GET /health` - Server health status

## Database Schema

### Product Model
```javascript
{
  productId: Number,      // Auto-generated
  name: String,          // Product name
  category: String,      // Product category
  price: Number,         // Product price
  quantity: Number,      // Stock quantity
  supplier: String,      // Supplier name
  createdAt: Date        // Date added
}
```

## Usage Instructions

1. **Start MongoDB** before running the application
2. **Run backend server** on port 5000
3. **Run frontend server** on port 3000
4. Open browser and navigate to `http://localhost:3000`

### Navigation
- **Dashboard** - Overview and statistics
- **Products** - View and manage all products
- **Add Product** - Add new products to inventory
- **Sales** - Process sales and view sales history

## Features in Detail

### Low Stock Alerts
- Products with quantity < 10 are highlighted in red
- Dashboard shows count of low stock products
- Sales page displays products needing restock

### Search Functionality
- Real-time search by product name
- Instant filtering of product list

### Form Validation
- Required field validation
- Numeric validation for price and quantity
- Error messages for user feedback

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes using the port

3. **CORS Errors**
   - Backend CORS is configured for localhost:3000
   - Ensure both servers are running

4. **Product Not Found**
   - Check if product ID exists
   - Verify database connection

### Development Tips

- Use `npm run dev` in backend for auto-restart with nodemon
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass to view database contents

## License

This project is for educational purposes. Feel free to modify and distribute.
