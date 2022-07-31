import { request } from "express"
import PostModel from "../models/PostModel.js"

export const postDetails=(req, res)=>{
    res.send("post controller created")
}

export const uploadFileResponse=(req, res)=>{
    console.log(req)
    if(!req.file){
       return res.json({
        success:false,
    })
    }
    return res.json({
        success:true, 
        fileName:req.file.filename,
    })
}

