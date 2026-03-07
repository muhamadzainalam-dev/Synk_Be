import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const GetUser = async (req, res) => {
  // Get Token
  const token = req.cookies.token;

  // Extract User
  const decode = jwt.verify(token, JWT_SECRET_KEY);

  // Extract User Email
  const email = decode.email;

  const user = await User.findOne({ email });

  res.json({ user });
};

export default GetUser;
