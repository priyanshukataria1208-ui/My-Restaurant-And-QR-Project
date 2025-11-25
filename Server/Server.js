const express=require("express")
const app=express()
app.use(express.json())

const Frontendroute=require("./Router/Frontendroute")
app.use(Frontendroute);
 
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/New_Project")




app.listen(5000,()=>{
    console.log("Hello Welcome TO my server")
})