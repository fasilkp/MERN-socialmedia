import express from 'express'
import { followUser, getUser, getUsers, unFollowUser, updateProfileDetails, uploadProfilePicResponse} from '../controllers/userController.js';
import uploadProfile from '../middlewares/uploadProfile.js'
import verifyLogin from '../middlewares/verifyLogin.js';

const router=express.Router()
const uploadProfilePic=uploadProfile();

router.post("/follow-user",verifyLogin, followUser);
router.post("/unfollow-user",verifyLogin, unFollowUser);
router.post("/get-user",verifyLogin, getUser);
router.post("/get-users",verifyLogin, getUsers);
router.post("/upload-profile-pic",verifyLogin, uploadProfilePic.single('image'), uploadProfilePicResponse);
router.post("/update-profile",verifyLogin, updateProfileDetails);


export default router;