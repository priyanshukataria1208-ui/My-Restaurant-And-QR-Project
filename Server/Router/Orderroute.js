const router=require("express").Router()
const OrderC=require("../Controller/Ordercontroller")
const checkGuestandUser = require("../middleware/checkGuestandUser")


router.post("/order",checkGuestandUser,OrderC.createOrder)



module.exports=router