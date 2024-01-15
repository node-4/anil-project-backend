const Terms = require("../models/terms");

// Create a new term
exports.createTerm = async (req, res) => {
    try {
        if (!req.body.content) {
            return res.status(400).json({ error: "Content is required" });
        }
        const term = new Terms({
            content: req.body.content,
        });

        const newTerm = await term.save();
        res.status(201).json(newTerm);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all terms
exports.getTerms = async (req, res) => {
    try {
        const terms = await Terms.find();
        if (!terms || terms.length === 0) {
            return res.status(404).json({ error: "Terms not found" });
        }
        res.status(200).json(terms[terms.length - 1]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get a single term by ID
exports.getTermById = async (req, res) => {
    try {
        const term = await Terms.findById(req.params.id);

        if (!term) {
            return res.status(404).json({ error: "Term not found" });
        }

        res.status(200).json(term);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Update a term by ID
exports.updateTerm = async (req, res) => {
    try {
        const term = await Terms.findById(req.params.id);

        if (!term) {
            return res.status(404).json({ error: "Term not found" });
        }

        term.content = req.body.content;

        const updatedTerm = await term.save();
        res.status(200).json(updatedTerm);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a term by ID
exports.deleteTerm = async (req, res) => {
    try {
        const term = await Terms.findByIdAndDelete(req.params.id);

        if (!term) {
            return res.status(404).json({ error: "Term not found" });
        }

        res.status(200).json({ message: "Term removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};
