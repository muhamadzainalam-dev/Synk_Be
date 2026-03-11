import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const UserMail = process.env.User_Mail;
const UserPass = process.env.User_Pass;

async function NodeMailer(recipientEmail, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: UserMail,
      pass: UserPass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  const mail = {
    from: `"Synk App" <${UserMail}>`,
    to: recipientEmail,
    subject: "Your One-Time Password (OTP)",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #004aad;">Your Verification Code</h2>
        <p>Dear user,</p>
        <p>Your one-time password (OTP) is:</p>
        <h1 style="color: #004aad; letter-spacing: 3px;">${otp}</h1>
        <p>This code will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>
        <p>Regards,<br><b>Synk Team</b></p>
      </div>
    `,
  };

  await transporter.sendMail(mail);
  console.log("OTP sent");
}

export default NodeMailer;
