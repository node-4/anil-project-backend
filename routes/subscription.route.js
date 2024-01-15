const express = require("express");
const router = express.Router();
const {
    createSubscription,
    getSubscriptions,
    updateSubscriptionStatus,
} = require("../controllers/subscription");

// Create a new subscription
router.post("/subscriptions", createSubscription);

// Get all subscriptions
router.get("/subscriptions", getSubscriptions);

// Update a subscription's status
router.patch("/subscriptions/:subscriptionId/status", updateSubscriptionStatus);

module.exports = router;
