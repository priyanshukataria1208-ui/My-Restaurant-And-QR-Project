const router=require("express").Router();
const CartC=require("../Controller//Carrtcontroller");
const verifytoken = require("../middleware/verifytoken");

router.post("/addcart",verifytoken,CartC.addToCart)
// Get cart
router.get("/",verifytoken, CartC.getCart);

// Increment / decrement / remove
router.post("/increment", verifytoken,CartC.incrementQuantity);
router.post("/decrement",verifytoken, CartC.decrementQuantity);
router.post("/remove",verifytoken, CartC.removeItem);


module.exports=router