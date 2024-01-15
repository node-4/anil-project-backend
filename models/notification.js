const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            // required: true,
        },
        title: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            // required: true,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
