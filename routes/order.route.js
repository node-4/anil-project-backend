const express = require("express");
const router = express.Router();
const { authJwt } = require("../middleware");
const { getOrderById, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders, } = require("../controllers/order.controller");

router.get("/:id", getOrderById);
router.get("/", getOrders);
router.post("/", [authJwt.verifyToken], createOrder);
router.put("/:id", updateOrderToPaid);
router.put("/:id/deliver", updateOrderToDelivered);

module.exports = router;
