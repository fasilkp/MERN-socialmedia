import express from 'express'
import { followUser, unFollowUser } from '../controllers/userController.js';
import verifyLogin from '../middlewares/verifyLogin.js';
const router=express.Router()


router.post("/follow-user",verifyLogin, followUser);
router.post("/unfollow-user",verifyLogin, unFollowUser);


export default router;