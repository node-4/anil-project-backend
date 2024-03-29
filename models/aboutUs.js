const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutUsSchema = new Schema(
    {
        title: {
            type: String,
            // required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: Object,
            default: {},
            // required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AboutUs", aboutUsSchema);
