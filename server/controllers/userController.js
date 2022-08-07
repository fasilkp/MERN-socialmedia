import UserModel from '../models/UserModel.js'
export const followUser=async(req, res)=>{
    // try{
        const {followerId, followingId} = req.body;
        await UserModel.findByIdAndUpdate({_id:followingId}, 
            {
                $addToSet:{
                    followers:followerId
                }
            },
            {
                function(err){
                    if(err) return res.status(500).json({success: false, error:err, message:"server error"});
                }
            })
        // const user = await UserModel.findOne({_id:followingId});
        return res.status(201).json({success:true})
    // }
    // catch(error){
    //     res.status(500).json({success: false, error:error, message:"server error"});
    // }
}