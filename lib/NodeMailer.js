import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Force IPv4
dns.setDefaultResultOrder("ipv4first");

const UserMail = process.env.User_Mail;
const UserPass = process.env.User_Pass;

async function NodeMailer({ recipientEmail, otp }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: UserMail,
        pass: UserPass,
      },
    });

    const mailOptions = {
      from: `"Login And Signup Component" <${UserMail}>`,
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
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}

export default NodeMailer;
