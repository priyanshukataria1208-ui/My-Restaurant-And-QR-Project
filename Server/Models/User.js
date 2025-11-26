const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    Uname:{type:String},
    Uemail:{type:String},
    Upassword:{type:String},
    UrefreshToken:{type:String},
    UisActive:{type:Boolean},
    Urole:{type:String   
    },
    Utotalpoint:{type:Number},
    UtotalOrder:{type:Number},
    UloyalityPoints:{type:Number},
    UrefreshTokenExpireyTime:{type:Date},
    Ulastlogin:{type:Date,
        
    }
})
module.exports=mongoose.model("User",UserSchema)