const User=require("../Models/User")

exports.Register=async(req,res)=>{
const{username,useremail,userpassword}=req.body;
const Checkpass=await bcrypt.hash(userpassword,10)



}