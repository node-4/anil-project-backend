const Festival = require("../models/festival");
const { createResponse } = require("../utils/response");
const deleteImageFromAWS = require("../services/deleteImage");
// Get all festivals
const getFestivals = async (req, res) => {
    try {
        const festivals = await Festival.find().lean();
        if (!festivals.length) {
            return createResponse(res, 404, "No festivals found.");
        }
        return createResponse(
            res,
            200,
            "Festivals fetched successfully.",
            festivals
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to fetch festivals.");
    }
};

// Get festival by ID
const getFestivalById = async (req, res) => {
    try {
        const festival = await Festival.findById(req.params.id).lean();
        if (!festival) {
            return createResponse(res, 404, "Festival not found.");
        }
        return createResponse(
            res,
            200,
            "Festival fetched successfully.",
            festival
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to fetch festival.");
    }
};

// Create new festival
const createFestival = async (req, res) => {
    try {
        const { name, description, startDate, endDate } = req.body;
        console.log(req.body);
        const festival = await Festival.create({
            name,
            description,
            image: { url: req.file.location, key: req.file.key },
            startDate: new Date(startDate.toString()),
            endDate: new Date(endDate.toString()),
        });
        return createResponse(
            res,
            201,
            "Festival created successfully.",
            festival
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to create festival.");
    }
};

// Update festival
const updateFestival = async (req, res) => {
    try {
        const { name, description, image, startDate, endDate } = req.body;
        const festival = await Festival.findByIdAndUpdate(
            req.params.id,
            { name, description, image, startDate, endDate },
            { new: true }
        );
        if (!festival) {
            return createResponse(res, 404, "Festival not found.");
        }
        return createResponse(
            res,
            200,
            "Festival updated successfully.",
            festival
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to update festival.");
    }
};

// Delete festival
const deleteFestival = async (req, res) => {
    try {
        const festival = await Festival.findByIdAndDelete(req.params.id);
        if (!festival) {
            return createResponse(res, 404, "Festival not found.");
        }
        deleteImageFromAWS(festival.image.key);
        return createResponse(res, 200, "Festival deleted successfully.");
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to delete festival.");
    }
};

module.exports = {
    getFestivals,
    getFestivalById,
    createFestival,
    updateFestival,
    deleteFestival,
};
