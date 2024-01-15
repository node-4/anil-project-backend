const Order = require("../models/order");
const { createResponse } = require("../utils/response");
const getOrders = async (req, res) => {
    try {
        const query = { ...req.query };
        if (query.startDate && query.endDate) {
            query.createdAt = {
                $gte: new Date(query.startDate),
                $lte: new Date(query.endDate),
            };
            delete query.startDate;
            delete query.endDate;
        }
        const order = await Order.find(query).populate([
            "userId",
            "items.product",
        ]);

        if (!order) {
            return createResponse(res, 404, "Order not found");
        }

        return createResponse(res, 200, "Order found", order);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server Error");
    }
};
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate([
            "userId",
            "items.product",
        ]);

        if (!order) {
            return createResponse(res, 404, "Order not found");
        }

        return createResponse(res, 200, "Order found", order);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server Error");
    }
};

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return createResponse(res, 400, "No order items");
        } else {
            const order = new Order(req.body);

            const createdOrder = await order.save();
            return createResponse(
                res,
                201,
                "Order created successfully",
                createdOrder
            );
        }
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server Error");
    }
};

const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return createResponse(res, 404, "Order not found");
        }
        if (req.body.isPaid) {
            order.isPaid = req.body.isPaid;
            order.paidAt = Date.now();
        }

        if (req.body.isDelivered) {
            order.isDelivered = req.body.isDelivered;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();

        return createResponse(res, 200, "Order updated", updatedOrder);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server Error");
    }
};

const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return createResponse(res, 404, "Order not found");
        }

        const updatedOrder = await order.save();

        return createResponse(res, 200, "Order updated", updatedOrder);
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Server Error");
    }
};

module.exports = {
    getOrderById,
    createOrder,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};
