const router = require("express").Router();
const UserC = require("../Controller/Usercontroller");

router.post("/register", UserC.Register);
router.post("/login", UserC.Login);

module.exports = router;
