import User from "../../models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import NodeMailer from "../../lib/NodeMailer.js";

import verifyEmail from "../../services/verifyEmail.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const LoginController = async (req, res) => {
  // Data From Fe
  const { email, password } = req.body;

  // Verify Email
  // const emailResult = await verifyEmail(email);

  // if (emailResult.email_deliverability.status_detail !== "valid_email") {
  //   return res.status(400).json({ message: "Invalid email address provided." });
  // }

  // Check User In DB
  const isUserExisted = await User.findOne({ email });

  if (!isUserExisted) {
    return res.status(404).json({
      message: "No account found with this email address.",
    });
  }

  // Get User's Hashed Password From DB
  const userHashedPassword = isUserExisted.password;

  // Maths Users Password And Return Bool
  const passwordMatch = bcrypt.compareSync(password, userHashedPassword);

  // If Password Is Wrong
  if (!passwordMatch) {
    return res.status(401).json({
      message: "Incorrect password. Please try again.",
    });
  }

  // Generate OTP
  const Generated_OTP = Math.floor(100000 + Math.random() * 900000);

  // Send OTP To User
  await NodeMailer({ recipientEmail: email, otp: Generated_OTP });

  // Updating OTP
  const existingUser = isUserExisted;

  existingUser.OTP = Generated_OTP;
  existingUser.OTP_Limit = Date.now() + 1 * 60 * 1000;
  existingUser.verified = false;

  await existingUser.save();

  // Generating tempToken
  const tempToken = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "1m" });

  // Send Success Response And Temp Token To Fe
  res
    .cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 1000,
    })
    .status(200)
    .json({
      message: "Login verification required. OTP has been sent to your email.",
    });
};

export default LoginController;
