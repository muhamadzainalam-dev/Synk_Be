import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/UserModel.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const VerifyOTPController = async (req, res) => {
  // Get Token From Cookies
  const tempToken = req.cookies.tempToken;

  // Get OTP From Body
  const OTP = req.body.OTP;

  if (!tempToken) {
    // No Token Provided
    return res.status(401).json({
      message: "Temporary authentication token is missing.",
    });
  }

  try {
    // Verify JWT Token
    const decodedToken = jwt.verify(tempToken, JWT_SECRET_KEY);

    // Verify OTP
    // Extract Email & User From Token
    const email = decodedToken.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    // Extract OTP & Expiry
    const storedOTP = user.OTP;
    const OTP_Limit = user.OTP_Limit;

    // Check OTP expiry
    if (OTP_Limit < Date.now()) {
      return res.status(410).json({
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Check OTP match
    if (storedOTP !== OTP) {
      return res.status(401).json({
        message: "Invalid OTP entered.",
      });
    }

    // Update User As Verified
    user.verified = true;

    await user.save();

    // Send Success Response And Token To Fe
    const token = jwt.sign({ email }, JWT_SECRET_KEY);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "OTP verified successfully. Authentication completed.",
      });
  } catch (message) {
    console.message("JWT verification message:", message);

    return res.status(401).json({
      message: "Invalid or expired verification token.",
    });
  }
};

export default VerifyOTPController;
