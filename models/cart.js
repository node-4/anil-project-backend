const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
        },

        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
