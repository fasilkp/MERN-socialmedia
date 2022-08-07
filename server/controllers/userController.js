import UserModel from '../models/UserModel.js'
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
                    if(err) return res.status(500).json({success: false, error:err, message:"followed"});
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
                    if(err) return res.status(500).json({success: false, error:err, message:"unfollowed"});
                }
            })
        return res.status(201).json({success:true})
}