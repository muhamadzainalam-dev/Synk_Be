// Packages Import
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Files Import
import ConnectToDB from "./lib/ConnectToDB.js";
import usersRouter from "./routes/routes.js";

// Package Middlewares
const server = express();
dotenv.config();
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Server Middlewares
server.use(express.json());
server.use(cookieParser());

// Constants
const PORT = process.env.PORT || 4000;

// Connect To DB
ConnectToDB();

// Routes
server.use("/", usersRouter);

// Server Listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
