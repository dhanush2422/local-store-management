import { useEffect, useMemo, useState } from "react";
import api from "../api";
import MessageBanner from "../components/MessageBanner";

// Sales page – sells a product, updates stock and shows total sales amount


const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalSalesValue, setTotalSalesValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [productsRes, statsRes] = await Promise.all([
        api.get("/products"),
        api.get("/dashboard"),
      ]);
      setProducts(productsRes.data);
      setTotalSalesValue(statsRes.data.totalSalesValue || 0);
      if (productsRes.data.length > 0) {
        setSelectedId(productsRes.data[0]._id);
      }
    } catch (_err) {
      setError("Failed to load sales data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const selectedProduct = useMemo(
    () => products.find((p) => p._id === selectedId),
    [products, selectedId]
  );

  const handleSell = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const qty = Number(quantity) || 1;
      const res = await api.post(`/sell/${selectedId}`, { quantity: qty });

      const updatedProduct = res.data.product;
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      setTotalSalesValue((prev) => prev + (res.data.saleAmount || 0));

      setSuccess(res.data.message || "Sale completed successfully.");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to complete sale. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value || 0);

  const handleClearSales = async () => {
    try {
      setSubmitting(true);
      setSuccess("");
      setError("");

      await api.post("/clear-sales");
      setTotalSalesValue(0);
      setSuccess("Total sales value cleared successfully.");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to clear sales. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Sales</h1>
        <p>Loading sales data...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Sales</h1>

      <MessageBanner
        type="success"
        message={success}
        onClose={() => setSuccess("")}
      />
      <MessageBanner type="error" message={error} onClose={() => setError("")} />

      <section className="section">
        <h2>Sell Product</h2>
        {products.length === 0 ? (
          <p>No products available to sell. Please add products first.</p>
        ) : (
          <form className="form" onSubmit={handleSell}>
            <div className="form__grid form__grid--compact">
              <label className="form__field">
                <span>Product</span>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  required
                >
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} (In stock: {p.quantity})
                    </option>
                  ))}
                </select>
              </label>

              <label className="form__field">
                <span>Quantity</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </label>

              {selectedProduct && (
                <div className="form__field">
                  <span>Price per unit</span>
                  <div className="form__static">{formatCurrency(selectedProduct.price)}</div>
                </div>
              )}
            </div>

            <div className="form__actions">
              <button
                type="submit"
                disabled={submitting || !selectedProduct || selectedProduct.quantity === 0}
              >
                {selectedProduct && selectedProduct.quantity === 0
                  ? "Out of stock"
                  : submitting
                  ? "Processing..."
                  : "Sell"}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="section">
        <h2>Total Sales Amount</h2>
        <p className="stat-card__value">{formatCurrency(totalSalesValue)}</p>
        <div className="form__actions">
          <button
            type="button"
            className="btn-secondary"
            disabled={submitting}
            onClick={handleClearSales}
          >
            {submitting ? "Clearing..." : "Clear Total Sales"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SalesPage;

