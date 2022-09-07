import express from 'express'
const router=express.Router()
import {checkLoggedIn, loginUser, logoutUser, registerUser, sendOTP} from '../controllers/authController.js'


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-logged-in", checkLoggedIn);
router.post("/send-otp", sendOTP);


export default router;