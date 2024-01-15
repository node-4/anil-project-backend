const express = require("express");
const router = express.Router();
const {
    createPrivacyPolicy,
    getAllPrivacyPolicies,
    getPrivacyPolicyById,
    updatePrivacyPolicy,
    deletePrivacyPolicy,
} = require("../controllers/privacy");

// Create a new privacy policy
router.post("/privacy", createPrivacyPolicy);

// Get all privacy policies
router.get("/privacy", getAllPrivacyPolicies);

// Get a single privacy policy by ID
router.get("/privacy/:id", getPrivacyPolicyById);

// Update a privacy policy by ID
router.put("/privacy/:id", updatePrivacyPolicy);

// Delete a privacy policy by ID
router.delete("/privacy/:id", deletePrivacyPolicy);

module.exports = router;
