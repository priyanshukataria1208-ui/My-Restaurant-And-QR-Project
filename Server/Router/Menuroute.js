const router=require("express").Router();
const upload=require("../middleware/upload")
const MenuC=require("../Controller/menucontroller")
const verifyToken=require("../middleware/verifytoken")
router.post("/menu",upload.single('image'),MenuC.createMenu)
router.get("/menu",verifyToken,MenuC.getcategory)



module.exports=router