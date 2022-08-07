import express from 'express'
import { followUser } from '../controllers/userController.js';
import verifyLogin from '../middlewares/verifyLogin.js';
const router=express.Router()


router.post("/follow-user",verifyLogin, followUser);


export default router;