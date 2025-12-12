const router=require("express").Router();
const CartC=require("../Controller//Carrtcontroller")

router.post("/addcart",CartC.addToCart)
// Get cart
router.get("/:userId", CartC.getCart);

// Increment / decrement / remove
router.post("/increment", CartC.incrementQuantity);
router.post("/decrement", CartC.decrementQuantity);
router.post("/remove", CartC.removeItem);


module.exports=router