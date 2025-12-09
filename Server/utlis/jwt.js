const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    "6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",
    { expiresIn: "7d" }
  );
};

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    "6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",
    { expiresIn: "7d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
