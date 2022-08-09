import express from 'express'
import { followUser, getUser, likePost, unFollowUser, unLikePost } from '../controllers/userController.js';
import verifyLogin from '../middlewares/verifyLogin.js';
const router=express.Router()


router.post("/follow-user",verifyLogin, followUser);
router.post("/unfollow-user",verifyLogin, unFollowUser);
router.post("/get-user",verifyLogin, getUser);
router.post("/like-post",verifyLogin, likePost);
router.post("/unlike-post",verifyLogin, unLikePost);


export default router;