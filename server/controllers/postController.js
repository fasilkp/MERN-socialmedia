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
export const deletePost = async(req, res)=>{
    const {id}=req.body;
    try{
        PostModel.remove(({ _id:id  }), function (err) {
            if (err) return res.json({success: false, error:err, message:"mongoose err"});
            return res.json({success: true, message:"post deleted successfull"})
         });
    }
    catch(error){
        res.json({success: false, error, message:"server error"});
    }
}  

export const viewPost=async(req, res)=>{
    try{
        const allPosts=await PostModel.find({})
        console.log(req.user)
        return res.json({success:true, allPosts})
    }
    catch(error){
        res.json({success: false, error, message:"server error"});
    }
}

