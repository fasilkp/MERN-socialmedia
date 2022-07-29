import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    likes:{
        type: String
    },
    comments:{
        type:Array
    }
})

const PostModel=mongoose.model("Posts", PostModel)
export default PostModel