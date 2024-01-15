const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
        },
        password: { type: String },
        otp: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Admin", schema);
