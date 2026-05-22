import { useEffect, useState } from "react";
import api from "../api";

// Dashboard shows high level KPIs and low-stock alerts
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalSalesValue: 0,
    lowStockProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (_err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value || 0);

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {loading && <p>Loading dashboard...</p>}
      {error && <p className="text-error">{error}</p>}

      {!loading && !error && (
        <>
          <section className="stats-grid">
            <div className="stat-card">
              <h2>Total Products</h2>
              <p className="stat-card__value">{stats.totalProducts}</p>
            </div>
            <div className="stat-card">
              <h2>Total Stock Available</h2>
              <p className="stat-card__value">{stats.totalStock}</p>
            </div>
            <div className="stat-card">
              <h2>Low Stock Products</h2>
              <p className="stat-card__value">
                {stats.lowStockProducts ? stats.lowStockProducts.length : 0}
              </p>
            </div>
            <div className="stat-card">
              <h2>Total Sales Value</h2>
              <p className="stat-card__value">{formatCurrency(stats.totalSalesValue)}</p>
            </div>
          </section>

          <section className="section">
            <h2>Low Stock Alert (Quantity &lt; 10)</h2>
            {stats.lowStockProducts && stats.lowStockProducts.length === 0 ? (
              <p>All products have sufficient stock.</p>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.lowStockProducts.map((p) => (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td className="low-stock">{p.quantity}</td>
                        <td>{p.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;

