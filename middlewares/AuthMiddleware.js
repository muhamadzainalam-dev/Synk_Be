import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyUser = async (req, res, next) => {
  // Get Token From Cookies
  const token = req.cookies.token;

  // Check If Token Exists
  if (!token) {
    return res.status(401).json({
      message: "Authentication token is missing or invalid.",
    });
  }

  // Verify JWT Token
  const decode = jwt.verify(token, JWT_SECRET_KEY);

  // Extract Email From Token
  const email = decode.email;

  // Find User In Database
  const user = await User.findOne({ email });

  // If User Does Not Exist
  if (!user) {
    return res.status(404).json({
      message: "Authenticated user not found.",
    });
  }

  // User Verified, Continue Request
  next();
};

export default verifyUser;
