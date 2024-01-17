const express = require("express");
const router = express.Router();
const uploadImage = require("../services/uploadImages");
const Product = require("../models/Product");
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getMostSellingProducts,
    recommededProduct,
    paginateProductSearch
} = require("../controllers/product.controller");

// Get all products
router.get("/products", getAllProducts);
router.get("/paginateProductSearch", paginateProductSearch);
router.get("/products-recommended/:id", recommededProduct);
// Get product by ID
router.get("/products/:id", getProductById);

// Create a new product
router.post("/products", uploadImage.array("image"), createProduct);

// Update a product by ID
router.put("/products/:id", updateProduct);

// Delete a product by ID
router.delete("/products/:id", deleteProduct);

//most selling products
router.get("/most-selling-products", getMostSellingProducts);

module.exports = router;
