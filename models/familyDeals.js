const mongoose = require("mongoose");

const giftBoxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true,
    },
});

module.exports = mongoose.model("familyDeals", giftBoxSchema);
