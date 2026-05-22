import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageBanner from "../components/MessageBanner";

// Simple shop login page with animated, lovable-style UI.
// This version is frontend-only: it just validates input and then
// routes the user into the app (no real authentication).
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    setSubmitting(true);
    setError("");

    // Fake delay so the button animation is visible
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("Welcome back! Redirecting to your dashboard...");
      // Optionally remember the email for a friendlier experience
      try {
        localStorage.setItem("store_login_email", form.email);
      } catch {
        // ignore storage errors
      }
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 800);
    }, 700);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h1 className="login-title">Shop Login</h1>
            <p className="login-subtitle">
              Sign in to enter your local store dashboard
            </p>
          </div>

          <MessageBanner
            type="error"
            message={error}
            onClose={() => setError("")}
          />
          <MessageBanner
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="login-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="login-input"
              />
            </div>

            <button type="submit" className="login-button" disabled={submitting}>
              {submitting ? (
                <span className="button-loading">
                  <span className="spinner" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>You can always go back to the dashboard from the top menu.</p>
          </div>
        </div>

        <div className="login-bg-decoration">
          <div className="bg-circle bg-circle-1" />
          <div className="bg-circle bg-circle-2" />
          <div className="bg-circle bg-circle-3" />
        </div>
      </div>
    </div>
  );
};

export default Login;

