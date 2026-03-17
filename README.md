# SocialMediaApp – Backend

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-black?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![AWS S3](https://img.shields.io/badge/AWS-S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=black)](https://aws.amazon.com/s3/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

Backend REST APIs for authentication + media handling, built for low-latency client integration.

> 🔗 **Frontend Repo:** `muhamadzainalam-dev/SocialMediaApp-Be`  
> `https://github.com/muhamadzainalam-dev/SocialMediaApp-Be`

---

## 💼 Skills & Tech Used

- **Server:** Express  
- **Database:** MongoDB (Mongoose)  
- **Auth/Security:** JWT (`jsonwebtoken`), password hashing (`bcrypt`)  
- **Email:** Nodemailer   
- **Cloud Storage:** AWS S3 SDK + Presigned URLs (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)  
- **HTTP & Config:** Axios, dotenv  
- **Middleware:** cookie-parser, cors  

**Also used**
- **AbstractAPI Email Verifier:** Axios integration using `ABSTRACT_API_KEY` (Abstract Email Reputation/Verification API)

---

## 🚀 Run Locally

```bash
git clone https://github.com/muhamadzainalam-dev/SocialMediaApp-Be.git
cd SocialMediaApp-Be
npm install
npm run dev
```

> Configure your frontend `.env` to point to the backend base URL (add these: `PORT
MONGODB_URI
ABSTRACT_API_KEY
JWT_SECRET_KEY
User_Mail
User_Pass
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_BUCKET_NAME`).

---

## 👨‍💻 Author

**Muhammad Zain Alam**  
Frontend Developer | React.js & Next.js Enthusiast

[![Email](https://img.shields.io/badge/Email-muhamadzainalam.dev%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:muhamadzainalam.dev@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/muhamadzain-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/muhamadzainalam-dev)

---

<div align="center">
  <strong>⭐ Star this repository if you found it useful!</strong>
</div>
