const router=require("express").Router()
const sessionC=require("../Controller/sessioncontroller")


router.post("/session",sessionC.session)

module.exports=router