const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name Category Required"],
        },
        image: {
            type: Object,
            default: {},
        },
        b2bDiscount: {
            type: Number,
            default: 0,
        },
        b2cDiscount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
