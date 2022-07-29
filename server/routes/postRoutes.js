import express from 'express'
const router=express.Router()
import {postDetails} from '../controllers/postController.js'


router.get("/", postDetails);


export default router;