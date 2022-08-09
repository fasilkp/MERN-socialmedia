import express from 'express'
import { followUser, getUser, unFollowUser} from '../controllers/userController.js';
import verifyLogin from '../middlewares/verifyLogin.js';
const router=express.Router()


router.post("/follow-user",verifyLogin, followUser);
router.post("/unfollow-user",verifyLogin, unFollowUser);
router.post("/get-user",verifyLogin, getUser);


export default router;