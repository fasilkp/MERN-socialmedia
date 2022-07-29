import PostModel from "../models/postModel.js"

export const postDetails=(req, res)=>{
    res.send("post controller created")
}

export const addPost=(req, res)=>{
    const post = new PostModel(req.body);
    post.save().then(() =>res.json({message:"post uploaded"}));
}