import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const GoogleLogin = async (req, res) => {
  try {
    // Get Access Token From Frontend
    const { access_token } = req.body;

    // Check If Access Token Exists
    if (!access_token) {
      return res.status(400).json({
        message: "Google access token is missing.",
      });
    }

    // Send Request To Google API
    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    // Extract User Data From Google Response
    const googleData = await googleRes.json();
    const { email, name } = googleData;

    if (!email) {
      return res.status(401).json({
        message: "Invalid Google authentication token.",
      });
    }

    // Generate Username From Email
    const user_Name = email.split("@")[0];

    // Find User In Database
    let user = await User.findOne({ email });

    // If User Does Not Exist - Create New User
    if (!user) {
      user = new User({
        name,
        email,
        user_Name,
        password: "ThisUserIsUsingThirdPartyAuth",
        OTP: undefined,
        OTP_Limit: undefined,
        verified: true,
      });

      await user.save();
    }

    // Generate Authentication JWT Token
    const token = jwt.sign({ email }, secretKey);

    // Send Success Response And Token To Frontend
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message:
          "Google authentication successful. User logged in successfully.",
      });
  } catch (error) {
    console.log("Google login error:", error);

    return res.status(500).json({
      message: "Google authentication failed. Please try again later.",
    });
  }
};

export default GoogleLogin;
