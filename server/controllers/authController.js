import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export const registerUser = async(req, res) => {
  try {
    const { userName, name, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    const userExist = await UserModel.findOne({userName});
    if(userExist) return res.json({ register: false, message: "userName Already Taken" });
    const user = new UserModel({
      userName,
      name,
      email,
      password: hashPassword,
      image:"defaultImage.jpg",
    });
    user.save((err) => {
      if (err) return res.json({ register: false, message: "save error " });
      
      return res.json({
          register: true,
          message: "registration successfull",
        });
    });
  } catch (err) {
    res.json({ register: false, message: "catch err" });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    return res.json({
      login: false,
      message: "logged in failed",
      err: "no user found",
    });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.json({
      login: false,
      message: "log in failed",
      err: "invalid email or password",
    });
  }
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.JWT_SECRET_KEY
  );
  //store on coockie
  const exp = new Date() + 1000 * 60;
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    })
    .json({ login: true, message: "logged in successfully", user: user._id });
};

export const logoutUser=(req, res)=>{
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  }).json({"message":"logged out"});
}

export const checkLoggedIn=async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) 
      return res.json({loggedIn:false, error:"no token"});
      
    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return res.json({name:verifiedJWT.name, loggedIn: true});
  } catch (err) {
    res.json({loggedIn:false, error:err});
  }
}