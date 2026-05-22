import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import MessageBanner from "../components/MessageBanner";

// Product List page – table view with search, edit and delete actions
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (_err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setSuccess("Product deleted successfully.");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (_err) {
      setError("Failed to delete product.");
    }
  };

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.name.toLowerCase().includes(term));
  }, [products, search]);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);

  return (
    <div className="page">
      <h1>Product List</h1>

      <MessageBanner
        type="success"
        message={success}
        onClose={() => setSuccess("")}
      />
      <MessageBanner type="error" message={error} onClose={() => setError("")} />

      <div className="toolbar">
        <input
          className="toolbar__search"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={fetchProducts}>
          Refresh
        </button>
      </div>

      <div className="summary">
        <span>
          <strong>Total products:</strong> {totalProducts}
        </span>
        <span>
          <strong>Total stock available:</strong> {totalStock}
        </span>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td className={p.quantity < 10 ? "low-stock" : ""}>{p.quantity}</td>
                  <td>{p.supplier}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table__actions">
                      <Link to={`/products/${p._id}/edit`} className="btn-link">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;

