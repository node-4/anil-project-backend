const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            // unique: true,
            default: "",
            lowercase: true,
        },
        password: {
            type: String,
            // required: true,
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
    },
    { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
