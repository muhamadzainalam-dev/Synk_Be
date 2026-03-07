import express from "express";

// Auth Imports
import SignupController from "../controllers/AuthControllers/SignupController.js";
import LoginController from "../controllers/AuthControllers/LoginController.js";
import VerifyOTPController from "../controllers/AuthControllers/VerifyOTPController.js";

// Auth Middlewares
import verifyUser from "../middlewares/AuthMiddleware.js";
import isAuthorized from "../middlewares/IsAuthorized.js";

// User Imports
import GetUser from "../controllers/UserControllers/GetUserController.js";
import GetFromuserName from "../controllers/UserControllers/GetFromuserNameController.js";
import UpdatePfMedia from "../controllers/UserControllers/UpdatePfMedia.js";

// AWS URL_Controller Imports
import {
  GetReadingUrl,
  GetUploadingUrl,
} from "../controllers/PostControllers/AWSCommands.js";

// Post Imports
import GetPosts from "../controllers/PostControllers/GetPosts.js";
import NewPost from "../controllers/PostControllers/NewPost.js";
import SetLike from "../controllers/PostControllers/SetLike.js";

const router = express.Router();

// Auth Routes
router.post("/signup", isAuthorized, SignupController);
router.post("/login", isAuthorized, LoginController);
router.post("/verifyotp", isAuthorized, VerifyOTPController);

// Get User
router.get("/getuser", verifyUser, GetUser);

// Get User From user_Name
router.post("/getfromusername", GetFromuserName);

// Update User PF Media
router.post("/updatepfmedia", UpdatePfMedia);

// Get AWS URLs
router.post("/getreadingurl", GetReadingUrl);
router.post("/getuploadingurl", verifyUser, GetUploadingUrl);

// Post Routes
router.get("/getposts", GetPosts);
router.post("/newpost", verifyUser, NewPost);

// Post Actions
router.post("/like", verifyUser, SetLike);

export default router;
