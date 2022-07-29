import UserModel from "../models/UserModel.js";

export const registerUser = (req, res) => {
  try {
    const user = new UserModel(req.body);
    user.save((err)=>{
        if(err){
            return res.json({ register: false, message: err });
        }
        else{
            return res.json({ register: true, message: "user logged in" });
        }
    })
  } catch (err) {
    res.json({ register: false, message: err });
  }
};
export const loginUser = async (req, res) => {

    const user = await UserModel.findOne({ email: req.body.email, password: req.body.password });
    if(user){
        return res.json({login:true, message:"logged in successfully", user})
    }
    else{
        return res.json({login:false, message:"logged in failed", err:"invalid email or password"})
    }

};
