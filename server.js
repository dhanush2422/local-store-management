const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file (e.g. MONGO_URI and PORT)
dotenv.config();

const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Allow JSON request bodies
app.use(express.json());

// Enable CORS so the React frontend can call this API
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Basic health check route for quick testing
app.get("/", (req, res) => {
  res.json({ message: "Store Management API is running" });
});

// Mount application routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api", salesRoutes);

// MongoDB connection helper so the app fails fast on bad configuration
async function startServer() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/store_management";

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

