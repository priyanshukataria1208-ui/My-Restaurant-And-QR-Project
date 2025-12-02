const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utlis/jwt");
const jwt =require("jsonwebtoken")


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
        const { name, password } = req.body;

        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        // Create Access Token
        const accessToken = jwt.sign(
            { name: user.name, email: user.email, role: user.role },
            "6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: accessToken,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }


};
