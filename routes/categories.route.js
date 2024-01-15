const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categorycontroller");
const upload = require("../services/uploadImages");

// Create a new category
router.post("/", upload.single("image"), createCategory);

// Retrieve all categories
router.get("/", getCategories);

// Retrieve a single category by id
router.get("/:id", getCategoryById);

// Update a category by id
router.put("/:id", updateCategory);

// Delete a category by id
router.delete("/:id", deleteCategory);

module.exports = router;
