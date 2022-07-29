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
