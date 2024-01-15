const Complain = require("../models/report");

// Create a new complain
exports.createComplain = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (!req.body.mobile) {
            return res.status(400).json({ error: "Mobile is required" });
        }
        if (!req.body.email) {
            return res.status(400).json({ error: "Title is required" });
        }
        if (!req.body.comment) {
            return res.status(400).json({ error: "Description is required" });
        }

        const complain = new Complain(req.body);
        const result = await complain.save();
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

// Get all complains
exports.getAllComplains = async (req, res) => {
    try {
        let query = { ...req.query };
        const complains = await Complain.find(query)
            .sort({ createdAt: -1 })
            .populate("userId");
        res.status(200).json(complains);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

// Get a single complain by ID
exports.getComplainById = async (req, res) => {
    try {
        const complain = await Complain.findById(req.params.id).populate(
            "userId"
        );
        if (!complain) {
            return res.status(404).json({ error: "Complain not found" });
        }
        res.status(200).json(complain);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

// Update a complain by ID
exports.updateComplain = async (req, res) => {
    try {
        const complain = await Complain.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!complain) {
            return res.status(404).json({ error: "Complain not found" });
        }
        res.status(200).json(complain);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

// Delete a complain by ID
exports.deleteComplain = async (req, res) => {
    try {
        const complain = await Complain.findByIdAndDelete(req.params.id);
        if (!complain) {
            return res.status(404).json({ error: "Complain not found" });
        }
        res.status(200).json({ message: "Complain deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};
