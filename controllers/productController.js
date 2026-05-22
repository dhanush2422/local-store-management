const Product = require("../models/Product");

// Create a new product document from the request body
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, supplier } = req.body;

    if (!name || !category || price == null || quantity == null || !supplier) {
      return res.status(400).json({ message: "All product fields are required." });
    }

    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      supplier,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product." });
  }
};

// Return all products for list view, searching and dashboard statistics
exports.getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

// Return single product by id for detail / edit screen
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

// Update an existing product by id
exports.updateProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, supplier } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, quantity, supplier },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product." });
  }
};

// Delete a product by id, used from the Product List page
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product." });
  }
};

