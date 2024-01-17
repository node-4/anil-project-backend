const express = require("express");
const router = express.Router();
const upload = require("../services/uploadImages");
const {
    createFamilyDeals,
    getFamilyDeals,
    getFamilyDealsById,
    updateFamilyDeals,
    deleteFamilyDeals,
} = require("../controllers/familyDealsController");

// Get all gift boxes
router.get("/", getFamilyDeals);

// Get gift box by id
router.get("/:id", getFamilyDealsById);

// Create new gift box
router.post("/", upload.single("photos"), createFamilyDeals);

// Update gift box by id
router.put("/:id", updateFamilyDeals);

// Delete gift box by id
router.delete("/:id", deleteFamilyDeals);

module.exports = router;
