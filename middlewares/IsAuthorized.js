import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const isAuthorized = async (req, res, next) => {
  // Get Token From Cookies
  const token = req.cookies.token;

  // Check If Token Exists
  if (token) {
    // Verify JWT Token
    const decode = jwt.verify(token, JWT_SECRET_KEY);

    // Extract Email From Token
    const email = decode.email;

    // Find User In Database
    const user = await User.findOne({ email });

    // If User Exists, Already Authenticated
    if (user) {
      return res.status(403).json({
        message: "Access denied. User is already authenticated.",
      });
    }
  } else {
    // No Token Found, Allow Request To Continue
    next();
  }
};

export default isAuthorized;
