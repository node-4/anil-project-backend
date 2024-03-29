const VendorVerification = require("../models/vendorVerification");
const { createResponse } = require("../utils/response");
const User = require("../models/user");
// Create vendor verification
exports.createVendorVerification = async (req, res) => {
    try {
        req.body.gstinOrPanImage = req.file.path;
        const newVendorVerification = new VendorVerification(req.body);
        const savedVendorVerification = await newVendorVerification.save();
        const user = await User.findById(savedVendorVerification.userId);
        user.isVerified = true;
        await user.save()
        createResponse(res, 200, "Vendor verification created successfully", savedVendorVerification);
    } catch (err) {
        console.error(err);
        createResponse(res, 500, "Server Error");
    }
};

// Get all vendor verifications
exports.getAllVendorVerifications = async (req, res) => {
    try {
        const vendorVerifications = await VendorVerification.find().populate("userId").sort({ createdAt: -1 }).lean();

        createResponse(res, 200, "Vendor verifications fetched successfully", vendorVerifications);
    } catch (err) {
        console.error(err);
        createResponse(res, 500, "Server Error");
    }
};

// Get vendor verification by ID
exports.getVendorVerificationById = async (req, res) => {
    try {
        const vendorVerification = await VendorVerification.findById(
            req.params.id
        )
            .populate("userId")
            .lean();

        if (!vendorVerification) {
            createResponse(res, 404, "Vendor verification not found");
            return;
        }

        createResponse(
            res,
            200,
            "Vendor verification fetched successfully",
            vendorVerification
        );
    } catch (err) {
        console.error(err);
        createResponse(res, 500, "Server Error");
    }
};

// Update vendor verification
exports.updateVendorVerification = async (req, res) => {
    try {
        if (req.file) {
            req.body.gstinOrPanImage = req.file.path;
        }
        const vendorVerification = await VendorVerification.findById(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!vendorVerification) {
            createResponse(res, 404, "Vendor verification not found");
            return;
        }

        const savedVendorVerification = await vendorVerification.save();
        if (savedVendorVerification.isVerified === true && savedVendorVerification.emailVerification === true && savedVendorVerification.phoneVerification === true && savedVendorVerification.gstinOrPanVerification === true) {
            const user = await User.findById(savedVendorVerification.userId);
            user.isVerified = true;
            await user.save();
        }
        createResponse(
            res,
            200,
            "Vendor verification updated successfully",
            savedVendorVerification
        );
    } catch (err) {
        console.error(err);
        createResponse(res, 500, "Server Error");
    }
};

// Delete vendor verification
exports.deleteVendorVerification = async (req, res) => {
    try {
        const vendorVerification = await VendorVerification.findById(
            req.params.id
        );

        if (!vendorVerification) {
            createResponse(res, 404, "Vendor verification not found");
            return;
        }

        await vendorVerification.remove();

        createResponse(res, 200, "Vendor verification deleted successfully");
    } catch (err) {
        console.error(err);
        createResponse(res, 500, "Server Error");
    }
};
