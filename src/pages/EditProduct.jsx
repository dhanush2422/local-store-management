import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import MessageBanner from "../components/MessageBanner";

// Edit Product page – loads an existing product and allows updating it
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        const p = res.data;
        setForm({
          name: p.name || "",
          category: p.category || "",
          price: p.price ?? "",
          quantity: p.quantity ?? "",
          supplier: p.supplier || "",
        });
      } catch (_err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };
      await api.put(`/products/${id}`, payload);
      setSuccess("Product updated successfully.");
    } catch (_err) {
      setError("Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Edit Product</h1>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Edit Product</h1>

      <MessageBanner
        type="success"
        message={success}
        onClose={() => setSuccess("")}
      />
      <MessageBanner type="error" message={error} onClose={() => setError("")} />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__grid">
          <label className="form__field">
            <span>Product Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__field">
            <span>Category</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__field">
            <span>Price</span>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__field">
            <span>Quantity in stock</span>
            <input
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__field">
            <span>Supplier name</span>
            <input
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form__actions">
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Update Product"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/products")}
          >
            Back to Product List
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

