const express = require("express");
const router = express.Router();
const {
    createWallet,
    getWalletById,
    addTransaction,
} = require("../controllers/wallet.controller");

// POST /wallets
router.post("/", createWallet);

// GET /wallets/:id
router.get("/wallet/:id", getWalletById);

// PUT /wallets/:id/transactions
router.put("/wallet/:id/transactions", addTransaction);

module.exports = router;
