const Category = require("../models/category.model");
const { createResponse } = require("../utils/response");

// Get all categories
const getCategories = async (req, res) => {
    try {
        let query = {};

        if (req.query.category) {
            query.category = RegExp(req.query.category, "i");
        }
        const categories = await Category.find(query).lean();
        createResponse(
            res,
            200,
            "Categories retrieved successfully.",
            categories
        );
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving categories.", null);
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean();
        if (!category) {
            createResponse(res, 404, "Category not found.", null);
        } else {
            createResponse(
                res,
                200,
                "Category retrieved successfully.",
                category
            );
        }
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving category.", null);
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        // console.log("hy", req.file);
        req.body.image = { url: req.file.location, key: req.file.key };
        // console.log(req.body);
        if (req.body.b2bDiscount) {
            req.body.b2bDiscount = parseFloat(req.body.b2bDiscount);
        } else {
            req.body.b2bDiscount = 0;
        }
        if (req.body.b2cDiscount) {
            req.body.b2cDiscount = parseFloat(req.body.b2cDiscount);
        } else {
            req.body.b2cDiscount = 0;
        }
        const category = new Category(req.body);
        await category.save();
        createResponse(res, 201, "Category created successfully.", category);
    } catch (error) {
        console.log(error);

        createResponse(res, 500, "Error creating category. " + error.message);
    }
};

// Update an existing category by ID
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!category) {
            createResponse(res, 404, "Category not found.", null);
        } else {
            createResponse(
                res,
                200,
                "Category updated successfully.",
                category
            );
        }
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error updating category.", null);
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            createResponse(res, 404, "Category not found.", null);
        } else {
            createResponse(
                res,
                200,
                "Category deleted successfully.",
                category
            );
        }
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error deleting category.", null);
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
