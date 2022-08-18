import express from 'express'
import { followUser, getUser, getUsers, unFollowUser, updateProfilePic} from '../controllers/userController.js';
import { uploadFileResponse } from '../controllers/postController.js';
import uploadProfile from '../middlewares/uploadProfile.js'
import verifyLogin from '../middlewares/verifyLogin.js';
const router=express.Router()

const uploadProfilePic=uploadProfile();

router.post("/follow-user",verifyLogin, followUser);
router.post("/unfollow-user",verifyLogin, unFollowUser);
router.post("/get-user",verifyLogin, getUser);
router.post("/get-users",verifyLogin, getUsers);
router.post("/upload-profile",verifyLogin, uploadProfilePic.single('image'), uploadFileResponse);
router.post("/update-profile",verifyLogin, updateProfilePic);


export default router;