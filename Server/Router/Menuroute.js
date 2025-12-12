const router=require("express").Router();
const upload=require("../middleware/upload")
const MenuC=require("../Controller/menucontroller")
router.post("/menu",upload.single('image'),MenuC.createMenu)
router.get("/menu",MenuC.getcategory)


module.exports=router