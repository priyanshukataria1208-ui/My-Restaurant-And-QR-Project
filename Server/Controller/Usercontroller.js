const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utlis/jwt");
const jwt = require("jsonwebtoken")
const transporter = require("../services/templates/emailservice")
const registerTemplates = require("../services/templates/registerTemplate")
const crypto = require("crypto");
const resertemplate = require("../services/templates/resettemplate");


exports.Register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

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
      password: hashedPass,
      phone:phone,
    });

    await record.save();


    const info = await transporter.sendMail({
      from: '"priyanshukataria1208@gmail.com',
      to: record.email,
      subject: "Hello ✔",
      // plain‑text body
      text: registerTemplates(record.name, "Comit"),
      // HTML body

    });
    console.log("Message sent:", info.messageId)

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
      { name: user.name, email: user.email, role: user.role, id: user._id },
      "6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",
      
    );
    const refreshToken = generateRefreshToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    },"6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14",
  
  );
    
  

   return res.status(200).json({
  success: true,
  message: "Login Successful",
  accessToken: accessToken,
  refreshToken: refreshToken, // ✅ ADD THIS
  user: {
    name: user.name,
    email: user.email,
    role: user.role,
    id: user._id,
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
exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // email send
    const info = await transporter.sendMail({
      from: '"priyanshukataria1208@gmail.com',
      to: user.email,
      subject: "Hello ✔",
      // plain‑text body
      html: resertemplate(user.name, resetLink)
      // HTML body

    });
    console.log("Message sent:", info.messageId)

    return res.status(200).json({
      success: true,
      message: "Reset password link sent to email"
    });

  } catch (error) {
    console.log("FORGOT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
exports.ResetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token invalid or expired"
      });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.log("RESET ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.refresh = async (req, res) => {
  try {
    //refreshToken in the req.body
    const { refreshToken } = req.body;
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        '6971cd8ae32d2e2fd4b9f4b03a19c2c937e837f900402aa733279e14'
      );
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Refresh token expired',
        });
      }
    }
    console.log(decoded);
    //step2 => find refresh token in the current user document
    const user = await User.findOne({ _id: decoded.id });
    if (!user.refreshToken) {
      return res.json({
        success: false,
        message: 'No refresh token found in db',
      });
    }
    if (user.refreshTokenExpiresTime < new Date()) {
      return res.send('Refresh token expired');
    }

    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });
    res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.json({
      message: error.name,
    });
  }
};



// 