
const dbconnect= async()=>{
    try{
        
    const connection=await mongoose.connect("mongodb+srv://priyanshukataria1208_db_user:aM050hOAod8DpYeE@cluster0.l55hips.mongodb.net/RestaurantandQR?appName=Cluster0")
    console.log("db connected")
    }catch(error){
        console.error("server err")
    }
}
module.exports=dbconnect