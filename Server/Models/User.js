const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    Uname:{type:String},
    Uemail:{type:String},
    Upassword:{type:String},

 role : {
    type : String ,
    enum : ['customer' , 'admin'],
    default : 'customer'
  },
  isActive: {
    type: Boolean,
  },
  totalSpend : {
    type : Number
  },
  totalOrders : {
    type : Number
  },
  loyaltyPoints : {
    type : Number 
  },
  refreshToken: {
    type: String,
  },
  refreshTokenExpiresTime : {
    type : Date
  },
  lastlogin : {
    type : Date,
    default : Date.now()
  },
accountTypes : {
    type : String ,
    enum : ['REGISTERED' , 'GUEST'],
    default : "REGISTERED"
  },
})
module.exports=mongoose.model("User",UserSchema)