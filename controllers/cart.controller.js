const { InteractionContextImpl, } = require("twilio/lib/rest/flexApi/v1/interaction");
const mongoose = require("mongoose");
const Cart = require("../models/cart");
const User = require("../models/user");
const { createResponse } = require("../utils/response");
const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let findUser = await User.findById(userId);
        if (!findUser) {
            return createResponse(res, 404, "User not found");
        } else {
            let cartItem = await Cart.findOne({ userId, productId, userType: findUser.userType });
            if (cartItem) {
                cartItem.quantity += 1;
                await cartItem.save();
                return createResponse(res, 200, "Item added to cart successfully", cartItem);
            }
            cartItem = new Cart({ userId, productId, userType: findUser.userType });
            await cartItem.save();
            return createResponse(res, 200, "Item added to cart successfully", cartItem);
        }
    } catch (error) {
        console.error(error);
        return createResponse(res, 500, "Internal server error");
    }
};
const getCartItems = async (req, res) => {
    try {
        console.log(req.user.role);
        const { userId } = req.params;
        let findUser = await User.findById(userId);
        if (!findUser) {
            return createResponse(res, 404, "User not found");
        } else {
            const cartItems = await Cart.find({ userId, userType: findUser.userType }).populate("productId");
            if (cartItems.length === 0) {
                return res.status(404).json({ success: false, message: "cart is empty", });
            }
            let totalItemCost = 0;
            let totalCost = 0;
            let totalDiscount = 0;
            if (cartItems.userType === "B2B") {
                cartItems.forEach((item) => {
                    totalItemCost += item.productId.price * item.quantity;
                    totalDiscount = ((item.productId.discountPercent * item.productId.price) / 100) * item.quantity;
                    totalCost += (item.productId.price * (100 - item.productId.discountPercent) * item.quantity) / 100;
                });
            } else {
                cartItems.forEach((item) => {
                    totalItemCost += item.productId.price * item.quantity;
                    totalCost += (item.productId.price * (100 - item.productId.discountPercent) * item.quantity) / 100;
                });
            }
            if (cartItems.userType === "B2B") {
                return res.status(200).json({ success: true, message: "Cart items retrieved successfully", data: { cartItems: cartItems, subTotal: totalItemCost, totalDiscount: totalDiscount, total: totalCost }, });
            } else {
                return res.status(200).json({ success: true, message: "Cart items retrieved successfully", data: { cartItems: cartItems, subTotal: totalItemCost, totalDiscount: (totalItemCost - totalCost).toFixed(2), total: totalCost, }, });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};
const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, { quantity: quantity }, { new: true });
        return res.status(200).json({ success: true, message: "Cart item quantity updated successfully", data: updatedCartItem, });
    } catch (error) {
        console.error();
        return res.status(400).json({ success: false, message: error.message });
    }
};
const removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await Cart.findByIdAndDelete(cartItemId);
        return res.status(200).json({ success: true, message: "Item removed from cart successfully", });
    } catch (error) {
        console.error();
        return res.status(400).json({ success: false, message: error.message });
    }
};
const getCartItems2 = async (req, res) => {
    try {
        console.log(req.user.role);
        const { userId } = req.params;
        const pipeline = [
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                    _id: 0,
                    productId: "$product._id",
                    price: "$product.price",
                    discountedPrice: "$product.discountedPrice",
                    discountPercent: "$product.discountPercent",
                    quantity: 1,
                },
            },
            {
                $project: {
                    productId: 1,
                    quantity: 1,
                    itemCost: { $multiply: ["$price", "$quantity"] },
                    discount: {
                        $multiply: [
                            { $divide: ["$discountPercent", 100] },
                            { $multiply: ["$price", "$quantity"] },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    cartItems: { $push: "$$ROOT" },
                    totalItemCost: { $sum: "$itemCost" },
                    totalDiscount: { $sum: "$discount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    cartItems: 1,
                    subTotal: "$totalItemCost",
                    totalDiscount: 1,
                    total: {
                        $subtract: ["$totalItemCost", "$totalDiscount"],
                    },
                },
            },
        ];
        const cart = await Cart.aggregate(pipeline);
        if (cart.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        const cartItems = cart[0].cartItems;
        const { subTotal, totalDiscount, total } = cart[0];
        return res.status(200).json({
            success: true,
            message: "Cart items retrieved successfully",
            data: {
                cartItems: cartItems,
                subTotal: subTotal,
                totalDiscount: totalDiscount,
                total: total,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    removeFromCart,
};
