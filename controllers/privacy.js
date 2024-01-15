const Privacy = require("../models/privacy");

// Create a new privacy policy
const createPrivacyPolicy = async (req, res) => {
    try {
        const { privacy } = req.body;
        if (!privacy)
            return res
                .status(400)
                .json({ error: "Privacy policy is required" });
        const newPrivacyPolicy = new Privacy({ privacy });
        const savedPrivacyPolicy = await newPrivacyPolicy.save();
        res.status(201).json(savedPrivacyPolicy);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all privacy policies
const getAllPrivacyPolicies = async (req, res) => {
    try {
        const privacyPolicies = await Privacy.find();
        if (!privacyPolicies || privacyPolicies.length === 0) {
            return res.status(404).json({ error: "Privacy policy not found" });
        }
        res.status(200).json(privacyPolicies[privacyPolicies.length - 1]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single privacy policy by ID
const getPrivacyPolicyById = async (req, res) => {
    try {
        const { id } = req.params;
        const privacyPolicy = await Privacy.findById(id);
        if (!privacyPolicy)
            return res.status(404).json({ error: "Privacy policy not found" });
        res.status(200).json(privacyPolicy);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

// Update a privacy policy by ID
const updatePrivacyPolicy = async (req, res) => {
    try {
        const { id } = req.params;
        const { privacy } = req.body;
        const updatedPrivacyPolicy = await Privacy.findByIdAndUpdate(
            id,
            { privacy },
            { new: true }
        );
        if (!updatedPrivacyPolicy)
            return res.status(404).json({ error: "Privacy policy not found" });
        res.status(200).json(updatedPrivacyPolicy);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

// Delete a privacy policy by ID
const deletePrivacyPolicy = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPrivacyPolicy = await Privacy.findByIdAndDelete(id);
        if (!deletedPrivacyPolicy)
            return res.status(404).json({ error: "Privacy policy not found" });
        res.status(200).json({
            message: "Privacy policy deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createPrivacyPolicy,
    getAllPrivacyPolicies,
    getPrivacyPolicyById,
    updatePrivacyPolicy,
    deletePrivacyPolicy,
};
