const express=require("express")
const app=express()
app.use(express.json())

const Frontendroute=require("./Router/Frontendroute")
app.use("/api",Frontendroute);
const dbconnect=require("./config/database")

app.get("/rgisters",(req,res)=>{
res.redirect("Register.jsx")

})
app.use(express.static("public"));


app.listen(5000,()=>{
    console.log("Hello Welcome TO my server")
})