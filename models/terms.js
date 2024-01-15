// Import mongoose
const mongoose = require("mongoose");

// Define the schema
const termsSchema = new mongoose.Schema({
    content: { type: String, required: true },
});

// Create the model
const Terms = mongoose.model("Terms", termsSchema);

// Export the model
module.exports = Terms;
