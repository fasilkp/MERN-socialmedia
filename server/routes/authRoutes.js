import express from 'express'
const router=express.Router()
import {loginUser} from '../controllers/authController.js'


router.get("/", loginUser);


export default router;