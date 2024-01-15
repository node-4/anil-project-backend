const Help = require("../models/help");

// Create a new help request
exports.createHelpRequest = async (req, res) => {
    try {
        if (!req.body.mobile) {
            return res.status(400).json({ message: "Mobile is required" });
        }
        if (!req.body.email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const help = new Help(req.body);
        const newHelp = await help.save();
        res.status(201).json(newHelp);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Get all help requests
exports.getAllHelpRequests = async (req, res) => {
    try {
        const helpRequests = await Help.find();
        res.status(200).json(helpRequests);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Get a single help request by ID
exports.getHelpRequestById = async (req, res) => {
    try {
        const helpRequest = await Help.findById(req.params.id);
        if (!helpRequest) {
            return res.status(404).json({ message: "Help request not found" });
        }
        res.status(200).json(helpRequest);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Update a help request by ID
exports.updateHelpRequest = async (req, res) => {
    try {
        const helpRequest = await Help.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!helpRequest) {
            return res.status(404).json({ message: "Help request not found" });
        }
        res.status(200).json(helpRequest);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Delete a help request by ID
exports.deleteHelpRequest = async (req, res) => {
    try {
        const helpRequest = await Help.findByIdAndDelete(req.params.id);
        if (!helpRequest) {
            return res.status(404).json({ message: "Help request not found" });
        }
        res.status(200).json({ message: "Help request deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
