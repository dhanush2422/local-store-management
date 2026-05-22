import { NavLink } from "react-router-dom";

// Top navigation bar for switching between main sections of the app
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__brand">Local Store Management</div>
      <nav className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Product List
        </NavLink>
        <NavLink
          to="/products/add"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Add Product
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Sales
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
          }
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;

