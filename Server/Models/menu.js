const mongoose=require("mongoose")
const menuSchema=mongoose.Schema({
    name:{type:String},
    Image:{type:String},
    price:{type:Number },
    category:{type:String},
})
module.exports=mongoose.model("menu",menuSchema)