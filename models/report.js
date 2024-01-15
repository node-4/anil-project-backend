const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        mobile: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",

            enum: ["pending", "resolved"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Complain", schema);
