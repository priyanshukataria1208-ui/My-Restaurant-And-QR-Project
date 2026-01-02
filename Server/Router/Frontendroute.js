const router = require("express").Router();
const UserC = require("../Controller/Usercontroller");
const SessionTokenVerify=require("../middleware/SessionTokenVerify")

router.post("/register", UserC.Register);
router.post("/login", UserC.Login);
router.post("/forgot-password", UserC.ForgotPassword);
router.post("/reset-password/:token", UserC.ResetPassword);

router.post("/convert",SessionTokenVerify,(req,res)=>{
    console.log("Hello")
})
router.post('/refresh' ,UserC.refresh)


module.exports = router;
