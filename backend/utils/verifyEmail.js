const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.verifyEmail = async (req, res) => {
  try {
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

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified"
      });
    }

   

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP"
      });
    }

    // If you implement otpExpires, check here

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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
