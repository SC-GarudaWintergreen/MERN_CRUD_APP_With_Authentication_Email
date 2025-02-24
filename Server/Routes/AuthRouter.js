import express from "express";
import signup from "../Controllers/AuthControllers/SignUp.Controller.js";
import login from "../Controllers/AuthControllers/Login.Controller.js";
import logout from "../Controllers/AuthControllers/Logout.Controller.js";
import auth from "../Middlewares/Auth.js";
import sendVerificationOTP from "../Controllers/AuthControllers/SendVerificationOTP.Controller.js";
import verifyEmail from "../Controllers/AuthControllers/VerifyEmail.Controller.js";
import resetPassword from "../Controllers/AuthControllers/ResetPassword.Controller.js";
import sendPasswordResetOTP from "../Controllers/AuthControllers/SendPasswordResetOTP.Controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/send-verification-otp", auth, sendVerificationOTP);
router.post("/verify-email", auth, verifyEmail);
router.get("/send-password-reset-otp", auth, sendPasswordResetOTP);
router.post("/reset-password", auth, resetPassword);

export default router;
