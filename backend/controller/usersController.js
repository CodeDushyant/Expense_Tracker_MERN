const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
// const { response } = require("express");
const Expense = require("../models/ExpenseLimitSchema");

const otpTemplate = (otp, name) => `
<div style="font-family:Arial;padding:20px">
  <h2 style="color:#4CAF50;">Hello ${name}</h2>
  <p>Your OTP for email verification is:</p>

  <h1 style="letter-spacing:6px">${otp}</h1>

  <p>This OTP is valid for <b>5 minutes</b>.</p>
  <p><b>Do not share this OTP with anyone.</b></p>

  <hr/>
  <small>Expense Tracker Team</small>
</div>
`;



exports.usersController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email });

    // ✅ USER ALREADY EXISTS
    if (existUser) {
      // ✔ VERIFIED USER
      if (existUser.isVerified) {
        return res.status(409).json({
          success: false,
          message: "User already exists, please login",
        });
      }

      // ✔ UNVERIFIED USER → UPDATE PASSWORD + RESEND OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcrypt.hash(password, 10);

      existUser.name = name;
      existUser.password = hashedPassword;
      existUser.otp = otp;

      await existUser.save();
      sendMail(email, "Your OTP Code", otpTemplate(otp, name))
  .then(() => console.log("OTP email sent"))
  .catch(err => console.error("OTP email failed:", err));

      return res.status(200).json({
        success: true,
        message: "OTP resent successfully",
        userID: existUser._id,
        name: existUser.name,
      });
    }

    // ✅ NEW USER
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      isVerified: false,
    });
   sendMail(email, "Your OTP Code", otpTemplate(otp, name))
  .then(() => console.log("OTP email sent"))
  .catch(err => console.error("OTP email failed:", err));

    await Expense.create({
      userId: user._id,
      dailyLimit: 200,
      weeklyLimit: 1400,
      monthlyLimit: 6000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userID: user._id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Enter Email",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }
    if (existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified, OTP resend not allowed",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update OTP in DB for that user
    existingUser.otp = otp;
    // Optionally reset isVerified to false if needed
    existingUser.isVerified = false;
    existingUser.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await existingUser.save();
    const name = existingUser.name;
   sendMail(email, "Your OTP Code", otpTemplate(otp, name))
  .then(() => console.log("OTP email sent"))
  .catch(err => console.error("OTP email failed:", err));

    return res.status(200).json({
      success: true,
      message: "Successfully resent OTP",
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
