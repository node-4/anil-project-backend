const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");

// Define routes for the user APIs
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/login-with-otp", userController.loginWithOTP);
router.post("/email-with-otp", userController.emailwithotp);
router.post("/verify-otp/:id", userController.verifyOTP);
router.get("/resend-otp/:id", userController.resendOTP);
module.exports = router;
