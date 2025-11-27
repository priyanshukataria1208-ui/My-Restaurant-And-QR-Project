const User = require("../Models/User");
const bcrypt = require("bcrypt");
const {genrateAccessToken,genraterefreshToken}=require("../utlis/jwt")

exports.Register = async (req, res) => {
  const { name, email, password } = req.body;
    const checkpass = await bcrypt.hash(password, 10);
    const usercheck = await User.findOne({ Uname: name })
    console.log(usercheck, checkpass);

    try {
        if (usercheck === null) {
            const record = new User({ Username: name, Upassword: checkpass, Uemail: email })
            console.log(record)
            
            record.save()
            res.json({
                status: 201,
                apiData: record,
                message: "Sucessfully Registered"
            
            })
            
        } else {
            res.json({
                status: 401,
                message: "Username is already taken"
            })
        }
    } catch (error) {
        console.log(error)
    }
    
};


exports.Login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required"
      });
    }

    const record = await User.findOne({ Uname: name });

    if (!record) {
      return res.status(401).json({
        success: false,
        message: "Username not found, please register first"
      });
    }

    const isPasswordmatch = await bcrypt.compare(password, record.Upassword);

    if (!isPasswordmatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }
    const accessToken = genrateAccessToken({
      name: record.name,
      email: record.email,
      role: record.role,
    });er
    const refreshToken = genraterefreshToken({
      name: record.name,
      email: record.email,
      role: record.role,
    });

    return res.status(200).json({
      success: true,
      apiData: record.Uname,
      message: `${record.Uname} Successfully Logged In`
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
  
};
