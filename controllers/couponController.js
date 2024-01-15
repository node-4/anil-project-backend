const Coupon = require("../models/coupon");
const { createResponse } = require("../utils/response");

// Create a new coupon
exports.createCoupon = async (req, res) => {
    try {
        if (!req.body.couponCode || !req.body.discount) {
            return createResponse(
                res,
                400,
                "Coupon and discount are required."
            );
        }
        const code = await Coupon.findOne({ couponCode: req.body.couponCode });
        if (code) {
            return createResponse(
                res,
                400,
                `Coupon with ${code.couponCode} already exists.`
            );
        }
        const coupon = new Coupon(req.body);
        await coupon.save();
        return createResponse(res, 200, "Coupon created successfully.", coupon);
    } catch (error) {
        console.error(error);
        console.error(error);
        return createResponse(res, 500, "Unable to create coupon.", error);
    }
};

// Get all coupons
exports.getCoupons = async (req, res) => {
    try {
        let query = {};
        if (req.query.couponCode) {
            query.couponCode = RegExp(req.query.couponCode, "i");
        }
        const coupons = await Coupon.find(query).lean();
        if (!coupons.length) {
            return createResponse(res, 404, "Coupons not found.", []);
        }
        return createResponse(
            res,
            200,
            "Coupons retrieved successfully.",
            coupons
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to retrieve coupons.", error);
    }
};

// Get a single coupon by ID
exports.getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return createResponse(res, 404, "Coupon not found.");
        }
        return createResponse(
            res,
            200,
            "Coupon retrieved successfully.",
            coupon
        );
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to retrieve coupon.", error);
    }
};

// Update a coupon by ID
exports.updateCouponById = async (req, res) => {
    try {
        if (req.body.couponCode) {
            const code = await Coupon.findOne({
                couponCode: req.body.couponCode,
            });
            if (code) {
                return createResponse(
                    res,
                    400,
                    `Coupon with ${code.couponCode} already exists.`
                );
            }
        }
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!coupon) {
            return createResponse(res, 404, "Coupon not found.");
        }
        return createResponse(res, 200, "Coupon updated successfully.", coupon);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to update coupon.", error);
    }
};

// Delete a coupon by ID
exports.deleteCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return createResponse(res, 404, "Coupon not found.");
        }
        return createResponse(res, 200, "Coupon deleted successfully.", coupon);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Unable to delete coupon.", error);
    }
};
