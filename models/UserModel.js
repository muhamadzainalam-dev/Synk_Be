import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user_Name: { type: String, required: true },
  password: { type: String, required: true },
  media_Key: { type: String },
  OTP: { type: String, required: true },
  OTP_Limit: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  joined_At: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema, "Synk_User_COL");
export default User;
