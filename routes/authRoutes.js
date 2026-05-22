const express = require("express");
const { register, login, verifyToken } = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/register → Register new shop user
router.post("/register", register);

// POST /api/auth/login → Login shop user
router.post("/login", login);

// GET /api/auth/verify → Verify token (protected route example)
router.get("/verify", verifyToken, (req, res) => {
  res.json({
    message: "Token is valid.",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      shopName: req.user.shopName,
    },
  });
});

module.exports = router;
