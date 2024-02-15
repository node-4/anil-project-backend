const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    paymentMethod: {
        type: String,
        default: "",
    },
    paymentResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    userOrderType: {
        type: String,
        enum: ["B2B", "B2C"],
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0.0,
    },
}, { timestamps: true });
orderSchema.pre("save", function (next) {
    this.totalCost = this.totalPrice + this.shippingPrice;
    next();
});

module.exports = mongoose.model("Order", orderSchema);
