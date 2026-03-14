import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.User_Mail,
    pass: process.env.User_Pass,
  },
});

async function NodeMailer({ recipientEmail, otp }) {
  const mailOptions = {
    from: `"Login And Signup Component" <${process.env.User_Mail}>`,
    to: recipientEmail,
    subject: "Your One-Time Password (OTP)",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #004aad;">Your Verification Code</h2>
      <p>Dear user,</p>
      <p>Your one-time password (OTP) is:</p>
      <h1 style="color: #004aad; letter-spacing: 3px;">${otp}</h1>
      <p>This code will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
      <p>Regards,<br><b>Your Company Team</b></p>
    </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("OTP email sent:", info.messageId);
  return info;
}

export default NodeMailer;
