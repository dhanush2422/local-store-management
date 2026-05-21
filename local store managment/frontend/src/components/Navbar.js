import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Store Management
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/add-product">Add Product</Link></li>
          <li><Link to="/sales">Sales</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
