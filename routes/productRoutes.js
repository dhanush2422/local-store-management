const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// POST   /api/products       → Add product
router.post("/", createProduct);

// GET    /api/products       → Get all products
router.get("/", getAllProducts);

// GET    /api/products/:id   → Get single product
router.get("/:id", getProductById);

// PUT    /api/products/:id   → Update product
router.put("/:id", updateProduct);

// DELETE /api/products/:id   → Delete product
router.delete("/:id", deleteProduct);

module.exports = router;

