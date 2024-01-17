const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const mongoosePaginate = require('mongoose-paginate-v2');
const dryFruitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },
        image: {
            type: [],
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        // discount: {
        //     type: Number,
        //     default: 0,
        // },
        stock: {
            type: Number,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            default: "gm",
        },
        brand: {
            type: String,
            default: "",
        },
        productType: {
            type: String,
            default: "",
            enum: ["B2B", "B2C"],
        },
        category: {
            type: String,
            default: "",
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Category",
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        soldCount: {
            type: Number,
            default: 0,
        },
        discountPercent: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

dryFruitSchema.virtual("totalSales").get(function () {
    return this.price * this.soldCount;
});

dryFruitSchema.plugin(mongoosePaginate);
dryFruitSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("Product", dryFruitSchema);
