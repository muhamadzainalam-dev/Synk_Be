import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const ConnectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected To DB Sucessfully!");
  } catch (err) {
    console.error(`Error Occured ${err}`);
  }
};

export default ConnectToDB;
