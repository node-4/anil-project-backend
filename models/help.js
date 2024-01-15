const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Help", schema);
