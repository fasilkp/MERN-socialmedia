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
export const uploadPost=async(req, res)=>{
    const {postSrc,description,userId, userName, name}=req.body;
    const newPost = new PostModel({
        name,
        postSrc,
        description,
        userId,
        userName,
        name,
        likes:0,
        comments:[]
    })
    newPost.save((err)=> {
        if (err) return res.json({success: false, message:"post upload failed", error: err})
    });
    return res.json({success: true, message:"post upload successfull", post:newPost})
}
export const editPost=async(req, res)=>{
    const {id, description}=req.body;
    try{
        const updatedPost=await PostModel.findOneAndUpdate({ _id: id }, { $set: { description: description } });
        return res.json({success: true, message:"post update successfull"})
    }
    catch(error){
        res.json({success: false, error});
    }

    
   
}

