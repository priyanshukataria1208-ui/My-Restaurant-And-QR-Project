const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    // 🔥 ADD THIS (1)
    console.log("HEADER ===>", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // "Bearer tokenvalue" → SPLIT BY SPACE
    const token = authHeader.split(" ")[1];

    // 🔥 ADD THIS (2)
    console.log("TOKEN ===>", token);

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(
      token,
      "6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14"
    );

    console.log("DECODED ===>", decoded);

    req.user = decoded; // Attach user to request
    next(); // MOVE AHEAD
  } catch (error) {
    console.log("JWT ERROR ===>", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifytoken;
