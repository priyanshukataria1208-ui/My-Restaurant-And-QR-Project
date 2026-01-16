const router = require("express").Router();
const CoupanC = require("../Controller/Coupancontroller");
const verifyToken = require("../middleware/verifytoken"); // optional, if only logged-in users can use coupons

// Get all coupons for a user (optional, or get by ID)
router.get("/coupan", verifyToken, CoupanC.getAllcoupan);

// Create a new coupon
router.post("/coupan", CoupanC.registerCoupan);

// Apply a coupon to the cart
router.post("/coupan/apply", verifyToken, CoupanC.applyCoupon);


router.get("/admin/coupons", verifyToken, CoupanC.getAllCoupansAdmin);
router.patch("/admin/coupons/:id/toggle", verifyToken, CoupanC.toggleCouponStatus);

module.exports = router;
