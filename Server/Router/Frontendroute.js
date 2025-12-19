const router = require("express").Router();
const UserC = require("../Controller/Usercontroller");

router.post("/register", UserC.Register);
router.post("/login", UserC.Login);
router.post("/forgot-password", UserC.ForgotPassword);
router.post("/reset-password/:token", UserC.ResetPassword);


module.exports = router;
