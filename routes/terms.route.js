const express = require("express");
const router = express.Router();
const termsController = require("../controllers/terms");

// Create a new term
router.post("/terms", termsController.createTerm);

// Get all terms
router.get("/terms", termsController.getTerms);

// Get a single term by ID
router.get("/terms/:id", termsController.getTermById);

// Update a term by ID
router.put("/terms/:id", termsController.updateTerm);

// Delete a term by ID
router.delete("/terms/:id", termsController.deleteTerm);

module.exports = router;
