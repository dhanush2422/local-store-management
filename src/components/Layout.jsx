import Navbar from "./Navbar";

// Shared layout used on every page so navigation and spacing stay consistent
const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;

