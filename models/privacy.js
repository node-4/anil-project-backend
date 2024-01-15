const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        privacy: {
            type: String,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Privacy", schema);
