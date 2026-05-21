import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [totalSales, setTotalSales] = useState(0);
  const [recentSales, setRecentSales] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage('Error fetching products');
    }
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = products.find(p => p.productId === parseInt(productId));
    setSelectedProduct(product);
    setQuantity(1);
    setMessage('');
  };

  // Handle sale
  const handleSale = async (e) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      setMessage('Please select a product');
      return;
    }

    if (quantity <= 0) {
      setMessage('Quantity must be greater than 0');
      return;
    }

    if (quantity > selectedProduct.quantity) {
      setMessage('Insufficient stock available');
      return;
    }

    try {
      const response = await axios.post(`/api/sell/${selectedProduct.productId}`, { quantity });
      
      // Add to recent sales
      const sale = {
        productName: selectedProduct.name,
        quantity: quantity,
        totalAmount: response.data.totalAmount,
        timestamp: new Date()
      };
      setRecentSales(prev => [sale, ...prev.slice(0, 4)]); // Keep only last 5 sales
      
      // Update total sales
      setTotalSales(prev => prev + response.data.totalAmount);
      
      // Update products list
      fetchProducts();
      
      // Reset form
      setSelectedProduct(null);
      setQuantity(1);
      setMessage(`Sale completed! Total: $${response.data.totalAmount.toFixed(2)}`);
      
    } catch (error) {
      console.error('Error processing sale:', error);
      setMessage(error.response?.data?.message || 'Error processing sale');
    }
  };

  // Calculate total stock value
  const totalStockValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return (
    <div>
      <h1>Sales Management</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Sale Form */}
        <div className="card">
          <div className="card-header">Process Sale</div>
          <form onSubmit={handleSale}>
            {/* Product Selection */}
            <div className="form-group">
              <label className="form-label">Select Product</label>
              <select
                className="form-control"
                value={selectedProduct ? selectedProduct.productId : ''}
                onChange={(e) => handleProductSelect(e.target.value)}
              >
                <option value="">Choose a product...</option>
                {products
                  .filter(product => product.quantity > 0) // Only show products with stock
                  .map(product => (
                    <option key={product._id} value={product.productId}>
                      {product.name} - ${product.price.toFixed(2)} (Stock: {product.quantity})
                    </option>
                  ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                max={selectedProduct ? selectedProduct.quantity : 1}
              />
              {selectedProduct && (
                <small style={{ color: '#666' }}>
                  Available stock: {selectedProduct.quantity}
                </small>
              )}
            </div>

            {/* Sale Summary */}
            {selectedProduct && (
              <div className="card" style={{ backgroundColor: '#f8f9fa', marginBottom: '15px' }}>
                <div><strong>Product:</strong> {selectedProduct.name}</div>
                <div><strong>Price per unit:</strong> ${selectedProduct.price.toFixed(2)}</div>
                <div><strong>Quantity:</strong> {quantity}</div>
                <div><strong>Total Amount:</strong> ${(selectedProduct.price * quantity).toFixed(2)}</div>
              </div>
            )}

            {/* Message */}
            {message && (
              <div className={`alert ${message.includes('Error') || message.includes('Insufficient') ? 'alert-danger' : 'alert-success'}`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success"
              disabled={!selectedProduct || selectedProduct.quantity === 0}
            >
              Process Sale
            </button>
          </form>
        </div>

        {/* Sales Summary */}
        <div>
          {/* Statistics */}
          <div className="card">
            <div className="card-header">Sales Summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <div className="stat-label">Total Sales (This Session)</div>
                <div className="stat-value">${totalSales.toFixed(2)}</div>
              </div>
              <div>
                <div className="stat-label">Total Stock Value</div>
                <div className="stat-value">${totalStockValue.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="card">
            <div className="card-header">Recent Sales</div>
            {recentSales.length > 0 ? (
              <div>
                {recentSales.map((sale, index) => (
                  <div key={index} style={{ 
                    padding: '10px', 
                    borderBottom: index < recentSales.length - 1 ? '1px solid #eee' : 'none',
                    fontSize: '0.9rem'
                  }}>
                    <div><strong>{sale.productName}</strong></div>
                    <div>Quantity: {sale.quantity} | Total: ${sale.totalAmount.toFixed(2)}</div>
                    <div style={{ color: '#666', fontSize: '0.8rem' }}>
                      {sale.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                No sales processed yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="card">
        <div className="card-header">Stock Status</div>
        <div>
          {products.filter(p => p.quantity < 10).length > 0 ? (
            <div className="alert alert-warning">
              <strong>Low Stock Alert!</strong> The following products need restocking:
              <ul style={{ marginTop: '10px', marginBottom: '0' }}>
                {products
                  .filter(p => p.quantity < 10)
                  .map(product => (
                    <li key={product._id}>
                      {product.name} - {product.quantity} units left
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="alert alert-success">
              All products have sufficient stock levels
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
