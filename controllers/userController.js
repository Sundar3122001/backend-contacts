const asyncHandler= require("express-async-handler");
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken")
const User = require("../models/userModels");
//@desc Get all user
//@route POST/api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});
//@desc Get all user
//@route POST/api/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
  const {email,password} = req.body;
  if(!email|| !password){
    res.status(400);
    throw new Error("All fields are manditory")
  }
  const user = await User.findOne({email});
  if(user && (await bcrypt.compare(password,user.password))){
    const accesstoken=jwt.sign({
      user:{
      username:user.username,
      email:user.email,
      id:user.id,
    },},
  process.env.ACCESS_TOKEN_STRING,
  {expiresIn:"1m"});

  res.status(200).json({accesstoken})
  }else{
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
});
//@desc Get all user
//@route POST/api/users
//@access public
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user)
});

module.exports={registerUser, loginUser, currentUser}
