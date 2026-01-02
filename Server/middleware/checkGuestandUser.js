const jwt=require("jsonwebtoken")
const User =require("../Models/User")
const checkGuestandUser=async(req,res,next)=>{
    try {
          if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(
        token,
        '6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14'
      );
      console.log(decoded);
      const userData = await User.findById(decoded.id).select('-passwordHash')
      console.log(userData)
      req.user = userData
      next()}
      else{
        next()
      }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
} 
module.exports=checkGuestandUser;