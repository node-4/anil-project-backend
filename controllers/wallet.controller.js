const Wallet = require("../models/wallet");
const { createResponse } = require("../utils/response");

// POST /wallets
const createWallet = async (req, res) => {
    try {
        const { userId, user } = req.body;
        const wallet = await Wallet.create({ userId, user });
        createResponse(res, 201, "Wallet created successfully", wallet);
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error creating wallet", error.message);
    }
};
const mongoose = require("mongoose");

// GET /wallets/:id
const getWalletById = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({
            userId: new mongoose.Types.ObjectId(req.params.id),
        });
        if (!wallet) {
            createResponse(res, 404, "Wallet not found");
        } else {
            createResponse(res, 200, "Wallet retrieved successfully", wallet);
        }
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error retrieving wallet", error.message);
    }
};

// PUT /wallets/:id/transactions
const addTransaction = async (req, res) => {
    try {
        const { type, amount, description } = req.body;
        const wallet = await Wallet.findOne({ userId: req.params.id });
        if (!wallet) {
            createResponse(res, 404, "Wallet not found");
        } else {
            wallet.transactions.push({ type, amount, description });
            wallet.balance += type === "credit" ? amount : -amount;
            await wallet.save();
            createResponse(res, 200, "Transaction added successfully", wallet);
        }
    } catch (error) {
        console.log(error);
        createResponse(res, 500, "Error adding transaction", error.message);
    }
};

module.exports = {
    createWallet,
    getWalletById,
    addTransaction,
};
