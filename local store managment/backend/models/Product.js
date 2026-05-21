const mongoose = require('mongoose');

// Product Schema Definition
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  supplier: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate auto-incrementing product ID
ProductSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  try {
    const lastProduct = await this.constructor.findOne().sort({ createdAt: -1 });
    this.productId = lastProduct ? lastProduct.productId + 1 : 1;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Product', ProductSchema);
