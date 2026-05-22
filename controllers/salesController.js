const Product = require("../models/Product");
const Sale = require("../models/Sale");

// Handle selling a product and update stock plus sales history
exports.sellProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const quantityToSell = Number(req.body.quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.quantity === 0) {
      return res.status(400).json({ message: "Cannot sell. Stock is zero." });
    }

    if (product.quantity < quantityToSell) {
      return res
        .status(400)
        .json({ message: `Only ${product.quantity} item(s) left in stock.` });
    }

    product.quantity -= quantityToSell;
    await product.save();

    const amount = product.price * quantityToSell;

    await Sale.create({
      product: product._id,
      quantity: quantityToSell,
      amount,
    });

    res.json({
      message: "Sale completed successfully.",
      product,
      saleAmount: amount,
    });
  } catch (error) {
    console.error("Error processing sale:", error);
    res.status(500).json({ message: "Failed to process sale." });
  }
};

// Aggregate data for the dashboard: product counts, stock and total sales
exports.getDashboardStats = async (_req, res) => {
  try {
    const products = await Product.find();
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
    const lowStockProducts = products.filter((p) => p.quantity < 10);

    const salesAgg = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSalesValue: { $sum: "$amount" },
        },
      },
    ]);

    const totalSalesValue = salesAgg[0]?.totalSalesValue || 0;

    res.json({
      totalProducts,
      totalStock,
      lowStockProducts,
      totalSalesValue,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats." });
  }
};

// Clear all sales records so that total sales value resets to zero
exports.clearAllSales = async (_req, res) => {
  try {
    await Sale.deleteMany({});
    res.json({ message: "All sales have been cleared. Total sales value reset to zero." });
  } catch (error) {
    console.error("Error clearing sales:", error);
    res.status(500).json({ message: "Failed to clear sales." });
  }
};

