import express from 'express'
const router=express.Router()
import {postDetails, addPost} from '../controllers/postController.js'
import verifyLogin from '../middlewares/verifyLogin.js'

router.get("/", postDetails);
router.post("/add-post",verifyLogin, addPost);


export default router;