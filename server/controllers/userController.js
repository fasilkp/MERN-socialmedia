import UserModel from '../models/UserModel.js'
import PostModel from '../models/PostModel.js'
export const getUser=async(req, res)=>{
        const {userName} = req.body;
        const user = await UserModel.findOne({userName}, {password:0, email:0},{
            function(err){
                if(err ) return res.status(500).json({err:true, error:err, message:"request failed"});
            }
        })
        return res.status(200).json({user})
}
export const followUser=async(req, res)=>{
        const {followerId, followingId} = req.body;
        await UserModel.findByIdAndUpdate({_id:followingId}, 
            {
                $addToSet:{
                    followers:followerId
                }
            },
            {
                function(err){
                    if(err) return res.status(500).json({err:true, error:err, message:"following failed"});
                }
            })
        await UserModel.findByIdAndUpdate({_id:followerId}, 
            {
                $addToSet:{
                    following:followingId
                }
            },
            {
                function(err){
                    if(err) return res.status(500).json({err:true, error:err, message:"following failed"});
                }
            })
        return res.status(201).json({success:true})
}
export const unFollowUser=async(req, res)=>{
        const {followerId, followingId} = req.body;
        await UserModel.findByIdAndUpdate({_id:followingId}, 
            {
                $pull:{
                    followers:followerId
                }
            },
            {
                function(err){
                    if(err) return res.status(500).json({err:true, error:err, message:"unfollow failed "});
                }
            })
        await UserModel.findByIdAndUpdate({_id:followerId}, 
            {
                $pull:{
                    followers:followingId
                }
            },
            {
                function(err){
                    if(err) return res.status(500).json({err:true, error:err, message:"unfollow failed "});
                }
            })
        return res.status(201).json({success:true})
}

export const likePost=async(req, res)=>{
    const {postId, likedId} = req.body;
    await PostModel.findByIdAndUpdate({_id:postId}, 
        {
            $addToSet:{
                likes:likedId
            }
        },
        {
            function(err){
                if(err) return res.status(500).json({err:true, error:err, message:"liking failed"});
            }
        })
    return res.status(201).json({success:true})
}
