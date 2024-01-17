const express = require("express");
const router = express.Router();

// Define routes for the user APIs
router.use("/admin", require("../routes/admin.route"));
router.use("/auth", require("../routes/auth.route"));
router.use("/", require("../routes/user.route"));
router.use("/", require("../routes/product.route"));
router.use("/", require("../routes/wallet.route"));
router.use("/", require("../routes/product-review"));
router.use("/brands", require("../routes/brand.route"));
router.use("/", require("../routes/address.route"));
router.use("/coupons", require("../routes/coupon.route"));
router.use("/categories", require("../routes/categories.route"));
router.use("/wishlists", require("../routes/wishlist.route"));
router.use("/cart", require("../routes/cart.route"));
router.use("/orders", require("../routes/order.route"));
router.use("/banners", require("../routes/banner"));
router.use("/payments", require("../routes/payment.route"));
router.use("/notifications", require("../routes/notification.route"));
router.use("/aboutUs", require("../routes/aboutUs.route"));
router.use("/faqs", require("../routes/faq.route"));
router.use("/", require("../routes/wholeSeller.route"));
router.use("/festival-offers", require("../routes/festival.route"));
router.use("/gift-boxes", require("../routes/giftBoxes.route"));
router.use("/familyDeals", require("../routes/familyDeals.route"));
router.use("/feedback", require("../routes/feedback.route"));
router.use("/company-details", require("../routes/companyDetails"));
router.use(
    "/vendor-verification",
    require("../routes/vendorVerification.route")
);
router.use("/", require("../routes/privacy.route"));
router.use("/", require("../routes/terms.route"));
router.use("/", require("../routes/help"));
router.use("/reports", require("../routes/report"));
router.use("/", require("../routes/subscription.route"));
module.exports = router;
