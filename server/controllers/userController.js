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
                    following:followingId
                }
            },
            {
                function(err){
                    if(err) return res.status(500).json({err:true, error:err, message:"unfollow failed "});
                }
            })
        return res.status(201).json({success:true})
}
export const getUsers=async(req, res)=>{
        const {Ids} = req.body;
        const users= await UserModel.find({_id:{$in:Ids}},{userName:1, image:1, name:1}, {function(err){
            return res.json({error:err})
        }});
        res.json(users)        
}
export const uploadProfilePicResponse = (req, res) => {
    if (!req.file) {
      return res.status(500).json({
        err:true
      });
    }
    return res.status(201).json({
      err: false,
      fileName: req.file.filename,
    });
  };
export const updateProfileDetails = async (req, res) => {
    const { profileSrc, id, name , bio } = req.body;
    if(profileSrc){
        await UserModel.findByIdAndUpdate({_id:id},{$set:{image:profileSrc, name, bio}},
        {
            function(err){
                if(err) return res.status(500).json({err:true, error:err, message:"profile update failed"});
            }
        });
        return res.status(200).json({err:false,message:"profile update successfull"});
    }
    else{
        await UserModel.findByIdAndUpdate({_id:id},{$set:{name, bio}},
            {
                function(err){
                    if(err) return res.status(500).json({err:true, error:err, message:"profile update failed"});
                }
            });
            return res.status(200).json({err:false,message:"profile update successfull"});
    }
  };
  export const getUsersWithRegex=async(req, res)=>{
    const {regex} = req.body;
    const users= await UserModel.find({userName : {$regex : regex}},{userName:1, image:1, name:1}, {function(err){
        return res.json({err:true, error:err})
    }});
    res.json(users)        
}
