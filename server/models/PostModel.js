import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    postSrc:{
        type: String,
        required:true
    },
    description:{
        type: String
    }, 
    likes:{
        type: Array,
        default:[]

    },
    comments:{
        type:Array,
        default:[]
    },
    userId:{
        type: String,
        required:true
    },
    userName:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    uploadedAt: { type: Date, default: Date.now },
})

const PostModel=mongoose.model("Posts", PostSchema)
export default PostModel