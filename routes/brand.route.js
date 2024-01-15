const express = require("express");
const router = express.Router();
// const brandController = require("../controllers/brand.controller");
const upload = require("../services/uploadImages");

const {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
} = require("../controllers/brand.controller");
// Get all brands
router.get("/", getAllBrands);

// Get brand by ID
router.get("/:id", getBrandById);

// Create a new brand
router.post("/", upload.single("brandIcon"), createBrand);

// Update a brand
router.put("/:id", updateBrandById);

// Delete a brand
router.delete("/:id", deleteBrandById);

module.exports = router;
