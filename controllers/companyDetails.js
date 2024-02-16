const CompanyDetails = require("../models/companyDetails");
const { createResponse } = require("../utils/response");
const User = require("../models/user");
const VendorVerification = require("../models/vendorVerification");
// Get all company details
exports.getAllCompanyDetails = async (req, res) => {
    try {
        const companyDetails = await CompanyDetails.find().populate("userId");
        createResponse(
            res,
            200,
            "Successfully fetched all company details",
            companyDetails
        );
    } catch (error) {
        createResponse(
            res,
            500,
            "Error occurred while fetching company details",
            error.message
        );
    }
};

// Get a single company details by ID
exports.getCompanyDetailsById = async (req, res) => {
    try {
        const companyDetails = await CompanyDetails.findById(
            req.params.id
        ).populate("userId");
        if (!companyDetails) {
            return createResponse(
                res,
                404,
                `No company details found with ID: ${req.params.id}`
            );
        }
        createResponse(
            res,
            200,
            `Successfully fetched company details with ID: ${req.params.id}`,
            companyDetails
        );
    } catch (error) {
        createResponse(
            res,
            500,
            "Error occurred while fetching company details",
            error.message
        );
    }
};

// Create a new company details
exports.createCompanyDetails = async (req, res) => {
    try {
        const { userId, name, address, phone, email, website, gstin, payment } = req.body;
        req.body.gstinOrPanImage = req.file.path;
        const companyDetails = await CompanyDetails.create(req.body);
        await VendorVerification.create(req.body);
        const user = await User.findById(companyDetails.userId);
        user.isB2BVerified = true;
        await user.save()
        createResponse(res, 201, "Successfully created company details", companyDetails);
    } catch (error) {
        createResponse(
            res,
            500,
            "Error occurred while creating company details",
            error.message
        );
    }
};

// Update company details by ID
exports.updateCompanyDetailsById = async (req, res) => {
    try {
        const { name, address, phone, email, website, gstin, payment } =
            req.body;
        const updatedCompanyDetails = await CompanyDetails.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCompanyDetails) {
            return createResponse(
                res,
                404,
                `No company details found with ID: ${req.params.id}`
            );
        }
        createResponse(
            res,
            200,
            `Successfully updated company details with ID: ${req.params.id}`,
            updatedCompanyDetails
        );
    } catch (error) {
        createResponse(
            res,
            500,
            "Error occurred while updating company details",
            error.message
        );
    }
};

// Delete company details by ID
exports.deleteCompanyDetailsById = async (req, res) => {
    try {
        const deletedCompanyDetails = await CompanyDetails.findByIdAndDelete(
            req.params.id
        );
        if (!deletedCompanyDetails) {
            return createResponse(
                res,
                404,
                `No company details found with ID: ${req.params.id}`
            );
        }
        createResponse(
            res,
            200,
            `Successfully deleted company details with ID: ${req.params.id}`,
            deletedCompanyDetails
        );
    } catch (error) {
        createResponse(
            res,
            500,
            "Error occurred while deleting company details",
            error.message
        );
    }
};
