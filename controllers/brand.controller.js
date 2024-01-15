const Brand = require("../models/brand.model");
const { createResponse } = require("../utils/response");
// CREATE
const createBrand = async (req, res) => {
    try {
        req.body.brandIcon = { url: req.file.location, key: req.file.key };
        if (req.body.brandStatus === "true") {
            req.body.brandStatus = true;
        } else {
            req.body.brandStatus = false;
        }
        const brand = new Brand(req.body);
        const savedBrand = await brand.save();
        return createResponse(
            res,
            201,
            "Brand created successfully",
            savedBrand
        );
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, "Error creating brand", error);
    }
};

// READ ALL
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find().lean();
        return createResponse(res, 200, "All brands", brands);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, "Error retrieving brands", error);
    }
};

// READ ONE
const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id).lean();
        if (!brand) {
            return createResponse(res, 404, "Brand not found");
        }
        return createResponse(res, 200, "Brand found", brand);
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, "Error retrieving brand", error);
    }
};

// UPDATE
const updateBrandById = async (req, res) => {
    try {
        console.log(req.body);
        const updatedBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedBrand) {
            return createResponse(res, 404, "Brand not found");
        }
        return createResponse(
            res,
            200,
            "Brand updated successfully",
            updatedBrand
        );
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, "Error updating brand", error);
    }
};
const deleteImage = require("../services/deleteImage");
// DELETE
const deleteBrandById = async (req, res) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
        if (!deletedBrand) {
            return createResponse(res, 404, "Brand not found");
        }
        deleteImage(deletedBrand.brandIcon.key);

        return createResponse(
            res,
            200,
            "Brand deleted successfully",
            deletedBrand
        );
    } catch (error) {
        console.log(error);
        return createResponse(res, 500, "Error deleting brand", error);
    }
};

module.exports = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
};
