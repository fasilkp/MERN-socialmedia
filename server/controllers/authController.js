import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs"

var salt = bcrypt.genSaltSync(10);

export const registerUser = (req, res) => {
  try {
    const {userName, name, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new UserModel({
      userName,
      name,
      email,
      password:hashPassword,
    });
    user.save((err) => {
      if (err) {
        return res.json({ register: false, message: err });
      } else {
        return res.json({ register: true, message: "registration successfull" });
      }
    });
  } catch (err) {
    res.json({ register: false, message: err });
  }
};
export const loginUser = async (req, res) => {
  const {email, password}=req.body
  const user = await UserModel.findOne({
    email
  });
  if(!user) {
    return res.json({
      login: false,
      message: "logged in failed",
      err: "invalid email or password",
    });
  }
  
  return res.json({ login: true, message: "logged in successfully", user });
};
