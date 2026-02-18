const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

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

exports.updatePassword = async (req,res) => {
    try{
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "User is not verified"
            });
        }

        // --- Generate OTP ---
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendMail(
            user.email,
            "Your OTP Code",
            otpTemplate(otp, user.name || "User")
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email",
            userId: user._id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


exports.verifyOtpForReset = async (req,res) => {
    try{
        const { userId, otp } = req.body;
        
        
            if (!userId || !otp) {
              return res.status(400).json({
                success: false,
                message: "UserId and OTP required"
              });
            }
        
            const user = await User.findById(userId);
        
            if (!user) {
              return res.status(404).json({
                success: false,
                message: "User not found"
              });
            }

            if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP"
      });
    }

        user.isVerified = true;
        user.otp = null;
        await user.save();
        const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRE }
                );
        
                // ✅ COOKIE SET
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,        // production me true
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000
                });
    
        res.status(200).json({
          success: true,
          message: "Email verified successfully",
          token:token
        });

    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

exports.authOtpToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user;  // ✅ ab req.user me user milega
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const user = req.user; // JWT se aaya hua user

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password is required"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
