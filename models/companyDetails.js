const mongoose = require("mongoose");

const companyDetailsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            // required: true,
        },
        website: {
            type: String,
            // required: true,
        },
        gstinOrPancard: {
            type: String,
            // required: true,
        },
        gstinOrPanImage: {
            type: Object,
            default: {},
        },

        payment: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Payment",
        },
        website: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CompanyDetails", companyDetailsSchema);
