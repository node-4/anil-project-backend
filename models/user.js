const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
            lowercase: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            default: "User",
        },
        phone: {
            type: String,
            default: "",
        },
        profile: {
            type: String,
            default: "",
        },
        otp: {
            type: String,
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isB2BVerified: {
            type: Boolean,
            default: false,
        },
        userType: {
            type: String,
            enum: ["B2B", "B2C"],
            default: "B2C",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
