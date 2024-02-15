const express = require("express");
const router = express.Router();
const { addToCart, getCartItems, updateCartItemQuantity, removeFromCart, } = require("../controllers/cart.controller");
const { authJwt } = require("../middleware");
// Add item to cart

router.post("/", [authJwt.verifyToken], addToCart);

// Get cart items
router.get("/users/:userId", [authJwt.verifyToken], getCartItems);

// Update item in cart
router.put("/:cartItemId", updateCartItemQuantity);

// Remove item from cart
router.delete("/:cartItemId", removeFromCart);

module.exports = router;
