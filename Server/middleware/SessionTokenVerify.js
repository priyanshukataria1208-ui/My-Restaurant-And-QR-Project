const Session=require("../Models/session")

const SessionTokenVerify=async(req,res,next)=>{

    try {
        const{sessionToken}=req.body
        const session=await Session.findOne({sessionToken});
        if(session.expiresAt<Date.now()){
            res.send("Session token is expired")
        }
        req.session=session
        next()
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports=SessionTokenVerify