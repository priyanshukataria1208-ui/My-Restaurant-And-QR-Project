const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utlis/jwt");


exports.Register = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;

    // Check if username exists
    const usercheck = await User.findOne({ name: name });
    if (usercheck) {
      return res.status(401).json({
        status: 401,
        message: "Username is already taken"
      });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create new user
    const record = new User({
      name: name,
      email: email,
      password: hashedPass
    });

    await record.save();

    return res.status(201).json({
      status: 201,
      apiData: record,
      message: "Successfully Registered"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message
    });
  }
};


exports.Login = async (req, res) => {
  try {
    const { name, password,phone } = req.body;
     console.log("Login Request:", name, password); // ✅

    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required"
      });
    }

    const record = await User.findOne({ name });
      console.log("Found Record:", record); // ✅
    if (!record) {
      return res.status(401).json({
        success: false,
        message: "User not found, please register first"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, record.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const accessToken = generateAccessToken({
      name: record.name,
      email: record.email,
      role: record.role
    });

    const refreshToken = generateRefreshToken({
      name: record.name,
      email: record.email,
      role: record.role
    });

    record.refreshToken = refreshToken;
      record.refreshTokenExpiresTime = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );
    record.lastlogin = new Date();
    await record.save();

    return res.status(200).json({
      success: true,
      apiData: record.name,
      accessToken,
      refreshToken,
      message: `${record.name} Successfully Logged In`
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
