const FamilyDeals = require("../models/familyDeals");
const Product = require("../models/Product");
const deleteImageFromS3 = require("../services/deleteImage");
const { createResponse } = require("../utils/response");

const createFamilyDeals = async (req, res) => {
    try {
        const { name, description, price, product } = req.body;
        const allProductsExist = await Product.findById({ _id: product });
        if (!allProductsExist) {
            return createResponse(res, 400, "Invalid product ID(s)");
        }
        const familyDeals = new FamilyDeals({ name, description, price, product, });
        await familyDeals.save();
        console.log(familyDeals);
        return createResponse(res, 201, "Gift box created successfully", familyDeals);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server error");
    }
};
// API to get all gift boxes
const getFamilyDeals = async (req, res) => {
    try {
        const familyDealses = await FamilyDeals.find().populate("products");
        return createResponse(res, 200, "Gift boxes retrieved successfully", familyDealses);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server error");
    }
};
// API to get a single gift box by ID
const getFamilyDealsById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if gift box exists in the database
        const familyDeals = await FamilyDeals.findById(id).populate("products");
        if (!familyDeals) {
            return createResponse(res, 404, "Gift box not found");
        }
        return createResponse(res, 200, "Gift box retrieved successfully", familyDeals
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server error");
    }
};
// API to update a gift box by ID
const updateFamilyDeals = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, price, product } = req.body;
        let familyDeals = await FamilyDeals.findByIdAndUpdate(id, req.body, { new: true, });
        if (!familyDeals) {
            return createResponse(res, 404, "Gift box not found");
        }
        return createResponse(res, 200, "Gift box updated successfully", familyDeals
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server error");
    }
};
// API to delete a gift box by ID
const deleteFamilyDeals = async (req, res) => {
    try {
        const { id } = req.params;
        const familyDeals = await FamilyDeals.findByIdAndDelete(id);
        if (!familyDeals) {
            return createResponse(res, 404, "Gift box not found");
        }
        deleteImageFromS3(familyDeals.image.key);
        return createResponse(res, 200, "Gift box deleted successfully");
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server error");
    }
};
module.exports = {
    createFamilyDeals,
    getFamilyDeals,
    getFamilyDealsById,
    updateFamilyDeals,
    deleteFamilyDeals,
};
