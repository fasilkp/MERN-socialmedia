import express from 'express'
const router=express.Router()
import {checkLoggedIn, loginUser, logoutUser, registerUser} from '../controllers/authController.js'


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-logged-in", checkLoggedIn);


export default router;