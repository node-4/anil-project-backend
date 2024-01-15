const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/productReview.controller");
const { authJwt } = require("../middleware");
// Create a new review
router.post(
    "/product-reviews",
    [authJwt.verifyToken],
    reviewController.createReview
);

// Get all reviews
router.get("/product-reviews", reviewController.getAllReviews);

// Get a review by id
router.get("/product-reviews/:id", reviewController.getReviewById);

// Update a review by id
router.put("/product-reviews/:id", reviewController.updateReviewById);

// Delete a review by id
router.delete("/product-reviews/:id", reviewController.deleteReviewById);

module.exports = router;
