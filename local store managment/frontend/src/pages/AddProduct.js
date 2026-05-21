import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    supplier: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || '' : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.category.trim()) newErrors.category = 'Category is required';
    if (!product.price || product.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!product.quantity || product.quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
    if (!product.supplier.trim()) newErrors.supplier = 'Supplier name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('/api/products', product);
      setMessage('Product added successfully!');
      setProduct({
        name: '',
        category: '',
        price: '',
        quantity: '',
        supplier: ''
      });
      setErrors({});
      
      // Redirect to product list after 2 seconds
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && <div className="alert alert-danger" style={{ marginTop: '5px' }}>{errors.name}</div>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className={`form-control ${errors.category ? 'is-invalid' : ''}`}
              value={product.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
            {errors.category && <div className="alert alert-danger" style={{ marginTop: '5px' }}>{errors.category}</div>}
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              step="0.01"
              min="0"
            />
            {errors.price && <div className="alert alert-danger" style={{ marginTop: '5px' }}>{errors.price}</div>}
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label className="form-label">Quantity in Stock</label>
            <input
              type="number"
              name="quantity"
              className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="0"
            />
            {errors.quantity && <div className="alert alert-danger" style={{ marginTop: '5px' }}>{errors.quantity}</div>}
          </div>

          {/* Supplier */}
          <div className="form-group">
            <label className="form-label">Supplier Name</label>
            <input
              type="text"
              name="supplier"
              className={`form-control ${errors.supplier ? 'is-invalid' : ''}`}
              value={product.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
            />
            {errors.supplier && <div className="alert alert-danger" style={{ marginTop: '5px' }}>{errors.supplier}</div>}
          </div>

          {/* Message */}
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
