const express = require("express");
const router = express.Router();
const helpController = require("../controllers/help");

// Create a new help request
router.post("/help", helpController.createHelpRequest);

// Get all help requests
router.get("/help", helpController.getAllHelpRequests);

// Get a single help request by ID
router.get("/help/:id", helpController.getHelpRequestById);

// Update a help request by ID
router.put("/help/:id", helpController.updateHelpRequest);

// Delete a help request by ID
router.delete("/help/:id", helpController.deleteHelpRequest);

module.exports = router;
