import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    image:{
        type:String,
        default:"defaultImage.jpg"
    },
    followers: { 
        type: Array, 
        default: [] 
    },
    following: { 
        type: Array, 
        default: [] 
    },
    bio:{
        type: String,
        default:""
    },
    joinedAt: { type: Date, default: Date.now },
})

const UserModel=mongoose.model("Users", UserSchema)
export default UserModel