import express from 'express'
const router=express.Router()
import {postDetails, uploadFileResponse, uploadPost, editPost, deletePost, viewPost} from '../controllers/postController.js'
import uploadFile from '../middlewares/uploadFile.js'
import verifyLogin from '../middlewares/verifyLogin.js'

const upload=uploadFile()

router.get("/", postDetails);
router.post("/upload-file",verifyLogin, upload.single('image'), uploadFileResponse);
router.post("/upload-post",verifyLogin, uploadPost);
router.post("/edit-post",verifyLogin, editPost);
router.post("/delete-post",verifyLogin, deletePost);
router.get("/view-post",verifyLogin, viewPost)

export default router;