import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import MessageBanner from "../components/MessageBanner";

// Add Product page – creates a new product document through the API
const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      await api.post("/products", payload);
      setSuccess("Product added successfully.");
      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
        supplier: "",
      });
    } catch (_err) {
      setError("Failed to add product. Please check the details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h1>Add Product</h1>

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
              placeholder="e.g. Sugar 1kg"
            />
          </label>

          <label className="form__field">
            <span>Category</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              placeholder="e.g. Grocery"
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
            {submitting ? "Saving..." : "Add Product"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/products")}
          >
            Go to Product List
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

