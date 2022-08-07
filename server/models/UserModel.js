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
    },
    followers: { 
        type: Array, 
        default: [] 
    },
    following: { 
        type: Array, 
        default: [] 
    },
})

const UserModel=mongoose.model("Users", UserSchema)
export default UserModel