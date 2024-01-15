const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { createResponse } = require("../utils/response");
const Product = require("../models/Product");
// const { upload } = require("../services/uploadImages");
// Create a new product
const Category = require("../models/category.model");

const createProduct = async (req, res) => {
    try {
        const images = req.files.map((file) => {
            return { url: file.location, key: file.key };
        });
        const category = await Category.findById(req.body.categoryId);
        req.body.category = category.name;
        req.body.price = parseFloat(req.body.price);
        if (req.body.productType === "B2B") {
            req.body.discountPercent = parseFloat(category.b2bDiscount);
        }
        if (req.body.productType === "B2C") {
            req.body.discountPercent = parseFloat(category.b2cDiscount);
        }
        console.log(req.body);
        req.body.stock = parseFloat(req.body.stock);
        // console.log(req.body);
        // console.log(images);
        req.body.image = images;
        console.log(req.body);
        const product = new Product(req.body);
        await product.save();
        createResponse(res, 201, "Product created successfully", product);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to create product" });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = RegExp(req.query.category, "i");
        }
        if (req.query.brand) {
            filter.brand = RegExp(req.query.brand, "i");
        }
        if (req.query.categoryId) {
            filter.brand = req.query.categoryId;
        }
        if (req.query.productType) {
            filter.productType = req.query.productType;
        }
        if (req.query.name) {
            filter.name = RegExp(req.query.name, "i");
        }
        if (req.query.variant) {
            filter.variant = req.query.variant;
        }
        if (req.query.minPrice) {
            var minPrice = req.query.minPrice;
        }
        if (req.query.maxPrice) {
            var maxPrice = req.query.maxPrice;
        }

        const productType = req.query.productType || "B2C"; // default to B2C if productType is not specified

        const pipeline = [
            { $match: filter },
            {
                $project: {
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                    stock: 1,
                    variant: 1,
                    unit: 1,
                    brand: 1,
                    category: 1,
                    isAvailable: 1,
                    soldCount: 1,
                    userTypeDiscount: 1,
                    defaultPrice: 1,
                    discountPercent: 1,
                    price: "$price",
                    discountedPrice: {
                        $cond: [
                            {
                                $and: [
                                    { $gt: ["$discountPercent", 0] },
                                    { $eq: [productType, "B2C"] },
                                ],
                            },
                            {
                                $multiply: [
                                    "$price",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercent",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$price",
                        ],
                    },
                },
            },
        ];

        if (productType === "B2B") {
            // pipeline[1].$project.discountedPrice = 0;
            pipeline[1].$project.price = "$price";
        }

        const products = await Product.aggregate(pipeline);
        const data = products.filter((product) => {
            if (minPrice && maxPrice) {
                return (
                    product.discountedPrice >= minPrice &&
                    product.discountedPrice <= maxPrice
                );
            } else if (minPrice) {
                return product.discountedPrice >= minPrice;
            } else if (maxPrice) {
                return product.discountedPrice <= maxPrice;
            } else {
                return true; // return all products if no min or max price is specified
            }
        });
        createResponse(res, 200, "Products retrieved successfully", data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to get products" });
    }
};

// Get all products
const getAllProducts1 = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = RegExp(req.query.category, "i");
        }
        if (req.query.brand) {
            filter.brand = RegExp(req.query.brand, "i");
        }
        if (req.query.name) {
            filter.name = RegExp(req.query.name, "i");
        }
        if (req.query.variant) {
            filter.variant = req.query.variant;
        }
        if (req.query.minPrice) {
            var minPrice = req.query.minPrice;
        }
        if (req.query.maxPrice) {
            var maxPrice = req.query.maxPrice;
        }

        const products = await Product.aggregate([
            { $match: filter },
            {
                $project: {
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                    stock: 1,
                    variant: 1,
                    unit: 1,
                    brand: 1,
                    category: 1,
                    isAvailable: 1,
                    soldCount: 1,
                    userTypeDiscount: 1,
                    defaultPrice: 1,
                    discountPercent: 1,
                    discountedPrice: {
                        $cond: [
                            { $gt: ["$discountPercent", 0] },
                            {
                                $multiply: [
                                    "$price",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercent",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$price",
                        ],
                    },
                },
            },
        ]);
        const data = products.filter((product) => {
            if (minPrice && maxPrice) {
                return (
                    product.discountedPrice >= minPrice &&
                    product.discountedPrice <= maxPrice
                );
            } else if (minPrice) {
                return product.discountedPrice >= minPrice;
            } else if (maxPrice) {
                return product.discountedPrice <= maxPrice;
            } else {
                return true; // return all products if no min or max price is specified
            }
        });
        createResponse(res, 200, "Products retrieved successfully", data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to get products" });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.aggregate([
            { $match: { _id: new ObjectId(req.params.id) } },
            {
                $project: {
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                    stock: 1,
                    variant: 1,
                    unit: 1,
                    brand: 1,
                    category: 1,
                    isAvailable: 1,
                    soldCount: 1,
                    userTypeDiscount: 1,
                    defaultPrice: 1,
                    discountPercent: 1,
                    discountedPrice: {
                        $cond: [
                            { $gt: ["$discountPercent", 0] },
                            {
                                $multiply: [
                                    "$price",
                                    {
                                        $subtract: [
                                            1,
                                            {
                                                $divide: [
                                                    "$discountPercent",
                                                    100,
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            "$price",
                        ],
                    },
                },
            },
        ]);
        if (product.length === 0) {
            createResponse(res, 404, "Product not found");
        }
        createResponse(res, 200, "Product retrieved successfully", product[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to get product" });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            createResponse(res, 404, "Product not found");
        } else {
            createResponse(res, 200, "Product updated successfully", product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to update product" });
    }
};
const deleteImageFromAWS = require("../services/deleteImage");
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            createResponse(res, 404, "Product not found");
        } else {
            product.image.forEach((images) => {
                deleteImageFromAWS(images);
            });

            createResponse(res, 200, "Product deleted successfully", product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to delete product" });
    }
};

// const Product = require("../models/product");

// Route handler for getting the most selling products
const getMostSellingProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ soldCount: -1 }) // sort by soldCount in descending order
            .limit(20); // limit to 10 results
        if (products.length === 0) {
            return createResponse(res, 404, "No products found");
        }
        createResponse(res, 200, "retrieved most selling products ", products);
    } catch (error) {
        console.error(error);
        createResponse(res, 400, "Unable to get most selling products");
    }
};
const recommededProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        const productCategory = product.category;
        const filter = { category: { $ne: productCategory } };
        // filter.productType = product.productType;
        console.log(filter);
        const pipeline = [
            { $match: filter },
            {
                $project: {
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                    stock: 1,
                    variant: 1,
                    unit: 1,
                    brand: 1,
                    category: 1,
                    isAvailable: 1,
                    soldCount: 1,
                    userTypeDiscount: 1,
                    defaultPrice: 1,
                    discountPercent: 1,
                    price: "$price",
                    discountedPrice: {
                        $multiply: [
                            "$price",
                            {
                                $subtract: [
                                    1,
                                    {
                                        $divide: ["$discountPercent", 100],
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        ];
        const products = await Product.aggregate(pipeline);
        // console.log(products);
        if (products.length === 0) {
            return createResponse(res, 404, "No products found");
        }
        createResponse(res, 200, "Products retrieved successfully", products);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to get products" });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getMostSellingProducts,
    recommededProduct,
};

//
