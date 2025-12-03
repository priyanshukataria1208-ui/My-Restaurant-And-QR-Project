const router=require("express").Router()
const TableC=require("../Controller//tablecontroller")

router.post("/table",TableC.Createtable)





module.exports=router