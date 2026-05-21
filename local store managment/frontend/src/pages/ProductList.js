import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

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

  // Delete product
  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${productId}`);
        setMessage('Product deleted successfully');
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
        setMessage('Error deleting product');
      }
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Product List</h1>
      
      {/* Search Bar */}
      <div className="card">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}

      {/* Products Table */}
      <div className="card">
        <div className="card-header">
          All Products ({filteredProducts.length})
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Supplier</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className={product.quantity < 10 ? 'low-stock' : ''}>
                  {product.quantity}
                  {product.quantity < 10 && product.quantity > 0 && (
                    <span className="low-stock"> (Low Stock)</span>
                  )}
                  {product.quantity === 0 && (
                    <span className="low-stock"> (Out of Stock)</span>
                  )}
                </td>
                <td>{product.supplier}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/edit-product/${product.productId}`} className="btn btn-warning" style={{ marginRight: '5px' }}>
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.productId)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
