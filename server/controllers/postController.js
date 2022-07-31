import PostModel from "../models/PostModel.js"

export const postDetails=(req, res)=>{
    res.send("post controller created")
}

export const addPost=(req, res)=>{
    const post = new PostModel(req.body);
    post.save().then(() =>res.json({message:"post uploaded"}));
}

export const viewImage=(req, res)=>{
    res.send("../postImages/image.png")
}