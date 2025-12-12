const router = require("express").Router();
const ProductC = require("../Controller/Productcontroller");
const upload = require("../middleware/upload");

// upload image + create product
router.post("/products", upload.single("image"), ProductC.createproduct);
router.get("/products", ProductC.getproduct);

router.put("/products/:id", upload.single("image"), ProductC.updateproduct);
router.delete("/products/:id", ProductC.deleteproduct);

module.exports = router;
