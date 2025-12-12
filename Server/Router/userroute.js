const router = require("express").Router();
const UserC = require("../Controller/getusercontroller");
const { default: checkRole } = require("../middleware/checkRole");
const verifytoken = require("../middleware/verifytoken")

router.get("/getuser", verifytoken , checkRole(['admin',"customer"]), UserC.getUsers);
router.get("/getuser/:id", verifytoken,checkRole(['admin']), UserC.getUserById);
router.post("/getuser", verifytoken,checkRole(['admin']), UserC.createUser);
router.put("/getuser/:id", UserC.updateUser);
router.delete("/getuser/:id",  UserC.deleteUser);

module.exports = router;
