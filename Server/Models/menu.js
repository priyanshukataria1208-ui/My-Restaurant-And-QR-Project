const mongoose=require("mongoose")
const menuSchema=mongoose.Schema({
    name : {
    type : String 
 },  //ui se aayega
 description : {
   type : String
 }, //ui se aayege
 image : {
    type : String
 }, //ui in binary => parse => cloudinary save
 isAvailable : {
   type : Boolean  ,
   default : true
 },  //ui
 price : {
    type : Number
 }, //ui
 category : {
    type : String
 } //ui
})
module.exports=mongoose.model("Menu",menuSchema)