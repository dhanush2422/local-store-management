import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    totalSalesValue: 0
  });

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const calculateStats = (products) => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);
    const lowStockProducts = products.filter(product => product.quantity < 10).length;
    const totalSalesValue = products.reduce((sum, product) => sum + (product.price * (product.quantity || 0)), 0);

    setStats({
      totalProducts,
      totalStock,
      lowStockProducts,
      totalSalesValue
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-label">Total Products</div>
          <div className="stat-value">{stats.totalProducts}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Stock Available</div>
          <div className="stat-value">{stats.totalStock}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock Products</div>
          <div className="stat-value low-stock">{stats.lowStockProducts}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Sales Value</div>
          <div className="stat-value">${stats.totalSalesValue.toFixed(2)}</div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts > 0 && (
        <div className="alert alert-warning">
          <strong>Warning!</strong> You have {stats.lowStockProducts} products with low stock (less than 10 units).
        </div>
      )}

      {/* Recent Products Table */}
      <div className="card">
        <div className="card-header">Recent Products</div>
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map((product) => (
              <tr key={product._id}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className={product.quantity < 10 ? 'low-stock' : ''}>
                  {product.quantity}
                </td>
                <td>
                  {product.quantity === 0 ? (
                    <span className="low-stock">Out of Stock</span>
                  ) : product.quantity < 10 ? (
                    <span className="low-stock">Low Stock</span>
                  ) : (
                    <span style={{ color: '#27ae60' }}>In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
