const router=require("express").Router()
const CoupanC=require("../Controller/Coupancontroller")

router.get("/coupan/:id",CoupanC.getAllcoupan)
router.post("/coupan",CoupanC.registerCoupan)

module.exports=router