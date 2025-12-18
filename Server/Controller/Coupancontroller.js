const Coupan = require("../Models/coupen")

exports.getAllcoupan = async (req, res) => {
  try {
    const coupons = await Coupan.find();

    res.status(200).json({
      success: true,
      total: coupons.length,
      coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.registerCoupan = async (req, res,next) => {
  try {
    const {
      code,
      discountValue,
      maxDiscount,
      validFrom,
      validTo,
      isFirstOrder,
      usageLimit,
      minOrderAmount,
      description,
    } = req.body;

    if (!code || !discountValue) {
      return res.status(400).json({ message: "Code and discountType are required" });
    }

    const existingCoupan = await Coupan.findOne({ code: code.toUpperCase() });
    if (existingCoupan) {
      return res.status(400).json({ message: "Coupan code already exists" });
    }


    const coupanData = {
      code: code.toUpperCase(),

      maxDiscount: maxDiscount || null,
      validFrom: validFrom || new Date(),
      validTo: validTo || null,

      isFirstOrder: isFirstOrder || false,
      usageLimit: usageLimit || null,
      minOrderAmount: minOrderAmount || 0,
      discountValue,
      description: description || "",
      isActive: true,
      usedCount: 0,
    };

    const savedCoupan = await new Coupan(coupanData).save();

    res.status(201).json({
      message: "Coupan created successfully",
      coupan: savedCoupan,
    });
  } catch (error) {
    console.error("Error registering coupan:", error);
    next(error)
  }
};