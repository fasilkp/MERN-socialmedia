import express from 'express'
const router=express.Router()
import {postDetails, addPost, viewImage} from '../controllers/postController.js'
import verifyLogin from '../middlewares/verifyLogin.js'

router.get("/", postDetails);
router.post("/add-post",verifyLogin, addPost);
router.get("/image", viewImage);


export default router;