const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");

// Create a new coupon
router.post("/", couponController.createCoupon);

// Get all coupons
router.get("/", couponController.getCoupons);

// Get a single coupon by ID
router.get("/:id", couponController.getCouponById);

// Update a coupon by ID
router.put("/:id", couponController.updateCouponById);

// Delete a coupon by ID
router.delete("/:id", couponController.deleteCouponById);

module.exports = router;
