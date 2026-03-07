import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY;

const verifyEmail = async (email) => {
  try {
    // Request To Abstract API Email Verfifier
    const response = await axios.get(
      `https://emailreputation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`,
    );

    // Return Response Of Abstract API
    return response.data;
  } catch (error) {
    return error;
  }
};
export default verifyEmail;
