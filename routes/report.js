const express = require("express");
const router = express.Router();
const complainController = require("../controllers/report");

// Create a new complain
router.post("/", complainController.createComplain);

// Get all complains
router.get("/", complainController.getAllComplains);

// Get a single complain by ID
router.get("/:id", complainController.getComplainById);

// Update a complain by ID
router.patch("/:id", complainController.updateComplain);

// Delete a complain by ID
router.delete("/:id", complainController.deleteComplain);

module.exports = router;
