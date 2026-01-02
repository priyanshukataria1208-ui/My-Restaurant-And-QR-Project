const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const verifytoken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // ✅ VERIFY ACCESS TOKEN
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET // 🔥 ENV USE KARO
    );

    const userData = await User.findById(decoded.id);
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userData;
    next();

  } catch (error) {
    console.log("JWT ERROR ===>", error.name);

    // 🔥 MAIN FIX — TOKEN EXPIRED CASE
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        tokenExpired: true,
        message: "Access token expired",
      });
    }

    return res.status(403).json({
      message: "Invalid token",
    });
  }
};

module.exports = verifytoken;
