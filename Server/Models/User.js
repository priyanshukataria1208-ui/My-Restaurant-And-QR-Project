const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    Uname:{type:String},
    Uemail:{type:String},
    Upassword:{type:String},
    UrefreshToken:{type:String},
    UisActive:{type:Boolean},
})
module.exports=mongoose.model("User",UserSchema)