import express from 'express'
const router=express.Router()
import {postDetails, addPost} from '../controllers/postController.js'


router.get("/", postDetails);
router.post("/add-post", addPost);


export default router;