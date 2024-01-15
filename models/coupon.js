const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: [true, "Please Enter the coupon Code !"],
    },
    expirationDate: {
        type: Date,
        required: [true, "Enter expiry Date"],
    },
    activationDate: {
        type: Date,
        required: [true, "Please Enter joining Date"],
    },
    discount: {
        type: Number,
        required: [true, "Please Enter Discount Percentage"],
    },
    minOrder: {
        type: Number,
        required: [true, "Please Enter minimum order value"],
    },
    status: {
        type: Boolean,
        default: false,
    },
});
couponSchema.pre("save", function (next) {
    this.couponCode = this.couponCode.toUpperCase();
    next();
});

couponSchema.post("save", function (doc, next) {
    if (doc.activationDate <= new Date()) {
        doc.status = true;
        doc.save();
    }
    if (doc.expirationDate <= new Date() && doc.status) {
        doc.status = false;
        doc.save();
    }
    next();
});

couponSchema.index({ couponCode: 1 }, { unique: true });

module.exports = mongoose.model("coupons", couponSchema);
