const express = require("express");
const {
  sellProduct,
  getDashboardStats,
  clearAllSales,
} = require("../controllers/salesController");

const router = express.Router();

// POST   /api/sell/:id        → Sell product
router.post("/sell/:id", sellProduct);

// GET    /api/dashboard       → Dashboard summary stats
router.get("/dashboard", getDashboardStats);

// POST   /api/clear-sales     → Clear all sales (reset total sales value)
router.post("/clear-sales", clearAllSales);

module.exports = router;


