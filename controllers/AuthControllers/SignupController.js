import User from "../../models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import NodeMailer from "../../lib/NodeMailer.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import verifyEmail from "../../services/verifyEmail.js";

const SignupController = async (req, res) => {
  // Data From Fe
  const { name, email, password } = req.body;

  // Verify Email From Abstract
  // const emailResult = await verifyEmail(email);

  // if (emailResult.email_deliverability.status_detail !== "valid_email") {
  //   return res.status(400).json({ message: "Invalid email address provided." });
  // }

  // Generating user_Name
  const user_Name = email.split("@")[0];

  // Hashing The Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Find If User Existed
  const isUserExisted = await User.findOne({ email });
  if (isUserExisted) {
    return res.status(409).json({
      message: "An account with this email already exists.",
    });
  }

  // Generate OTP
  const Generated_OTP = Math.floor(100000 + Math.random() * 900000);

  // Save User Info To DB
  const newUser = new User({
    name: name,
    email: email,
    user_Name: user_Name,
    password: hashedPassword,
    OTP_Limit: Date.now() + 1 * 60 * 1000,
    OTP: Generated_OTP,
  });

  await newUser.save();

  // Send OTP To User
  NodeMailer(email, Generated_OTP);

  // Generating tempToken
  const tempToken = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "1m" });

  // Send Success Response And Temp Token To Fe
  res
    .cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/verifyotp",
      maxAge: 60 * 1000,
    })
    .status(201)
    .json({
      message:
        "Signup initiated successfully. OTP sent to your email for verification.",
    });
};

export default SignupController;
