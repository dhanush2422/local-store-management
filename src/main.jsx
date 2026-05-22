import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// React entry point – wraps the whole app in StrictMode for extra checks
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
