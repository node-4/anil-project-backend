const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, accessTokenTime } = require("../configs/auth.configs");
const User = require("../models/user");
const otpService = require("../services/otp");
const { createResponse } = require("../utils/response");
const Wallet = require("../models/wallet");
const Wishlist = require("../models/wishlist");
// Define a signup function that creates a new user document in the database
exports.signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // Check if a user with the given email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return createResponse(res, 409, "Email address already in use");
        }

        // Generate a random OTP and send it to the user's phone number

        // Create a new user document in the database with the given information
        const newUser = new User({
            name,
            email,
            password,
            phone,
        });

        await newUser.save();
        const wallet = await Wallet.create({ userId: newUser._id });
        console.log(wallet);
        await Wishlist.create({ userId: newUser._id });
        // Send a response indicating that the user was successfully created
        return createResponse(res, 201, "User created successfully", newUser);
    } catch (err) {
        console.error(err);
        return createResponse(res, 500, "Internal server error");
    }
};

// Define a login function that checks the user's credentials and sends an OTP for authentication
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a user with the given email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return createResponse(res, 401, "Invalid credentials");
        }

        // Check if the password matches the one stored in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return createResponse(res, 401, "Invalid credentials");
        }
        const accessToken = jwt.sign({ id: user._id }, secret, {
            expiresIn: accessTokenTime,
        });
        // Generate a new OTP and send it to the user's phone number

        return createResponse(res, 200, "OTP sent successfully", {
            accessToken,
        });
    } catch (err) {
        console.error(err);
        return createResponse(res, 500, "Internal server error");
    }
};

// Define a function to handle OTP verification and log the user in
exports.loginWithOTP = async (req, res) => {
    try {
        // Check if a user with the given email exists in the database
        // const user = await User.findOne({ phone });

        // if (!user) {
        //     return createResponse(
        //         res,
        //         404,
        //         "user not found for requested phone number"
        //     );
        // }
        if (!req.body.phone)
            return createResponse(res, 400, "phone number is required");
        const otp = otpService.generateOTP(4);
        const userRegistered = await User.findOne({ phone: req.body.phone });
        if (!userRegistered) {
            req.body.otp = otp;
            const user = await User.create(req.body);
            return createResponse(res, 200, "otp sent", {
                userId: user._id,
                otp: otp,
            });
        }
        userRegistered.otp = otp;
        await userRegistered.save();
        const message = `Your OTP for login is ${otp}`;
        await otpService.sendOTP("+91" + userRegistered.phone, message);

        // Save the OTP in the user document and send a response indicating that the OTP was sent

        return createResponse(res, 200, "otp sent", {
            userId: userRegistered._id,
            otp: otp,
        });
    } catch (err) {
        console.error(err);
        return createResponse(res, 500, "Internal server error");
    }
};
// const otp = otpService.generateOTP();

exports.verifyOTP = async (req, res) => {
    const { otp } = req.body;

    try {
        // Check if a user with the given userId exists in the database
        const user = await User.findById(req.params.id);

        if (!user) {
            return createResponse(res, 404, "User not found");
        }

        // Check if the OTP matches the one stored in the database
        if (otp !== user.otp) {
            return createResponse(res, 401, "Invalid OTP");
        }
        const accessToken = jwt.sign({ id: user._id }, secret, {
            expiresIn: accessTokenTime,
        });

        // If OTP is valid, clear it from the user document and send a response indicating that the OTP was verified successfully
        user.otp = null;
        await user.save();

        return createResponse(res, 200, "OTP verified successfully", {
            accessToken,
        });
    } catch (err) {
        console.error(err);
        return createResponse(res, 500, "Internal server error");
    }
};

exports.resendOTP = async (req, res) => {
    try {
        // Check if a user with the given userId exists in the database
        const user = await User.findById(req.params.id);

        if (!user) {
            return createResponse(res, 404, "User not found");
        }

        // Generate a new OTP and send it to the user's phone number
        const otp = otpService.generateOTP(4);
        // const message = `Your OTP for login is ${otp}`;
        // await otpService.sendOTP(user.phone, message);

        // Save the OTP in the user document and send a response indicating that the OTP was sent
        user.otp = otp;
        await user.save();

        return createResponse(res, 200, "OTP sent successfully", {
            userId: user._id,
            otp: otp,
        });
    } catch (err) {
        console.error(err);
        return createResponse(res, 500, "Internal server error");
    }
};
//pass - *o78G6|C
//user - tollerDeveloper
const nodemailer = require("nodemailer");
exports.emailwithotp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = otpService.generateOTP(4);
        const user = await User.findOne({ email: email });
        if (!user) {
            req.body.otp = otp;
            const user = await User.create(req.body);
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port : 587 ,
                secure : false,
                auth: {
                  user: "info@flyweis.technology",
                  pass: "ygkojtgemllsgpgs",
                }
            });
            const mailOptions = {
                from: "info@tollernuts.com",
                to: email,
                subject: "Login otp send successfully.",
                text:
                    `OTP ${otp}\n` +
                    `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                    `your otp is ${otp} ` +
                    `for reset password\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };
            transporter.sendMail(mailOptions, (error,info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({
                        message:
                            "Could not send email. Please try again later.",
                    });
                }else{
                    console.log(info.response);
                    res.status(200).json({message: "otp sent successfully",otp: otp,userId: user._id,});
                }
            });
            return createResponse(res, 200, "otp sent", {
                userId: user._id,
                otp: otp,
            });
        } else {
            const user1 = await User.findOneAndUpdate(
                { email },
                { otp: otp },
                { new: true }
            );
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                host: "smtp.gmail.com",
                port : 587 ,
                secure : false,
                auth: {
                  user: "info@flyweis.technology",
                  pass: "ygkojtgemllsgpgs",
                }
            });
            // Define the email options
            const mailOptions = {
                to: email,
                from: "info@tollernuts.com",
                subject: "Password reset request",
                text:
                    `OTP ${otp}\n` +
                    `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                    `your otp is ${otp} ` +
                    `for reset password\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            // Send the email with nodemailer
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({
                        message:
                            "Could not send email. Please try again later.",
                    });
                }
                res.status(200).json({
                    message: "otp sent successfully",
                    otp: otp,
                    userId: user._id,
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred. Please try again later.",
        });
    }
};
