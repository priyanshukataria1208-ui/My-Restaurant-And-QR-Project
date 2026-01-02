const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
  name: { type: String },

  email: { type: String },

  password: { type: String },
  phone: { type: String },

  role: {

    type: String,
    enum: ['customer', 'admin', "guest"],
    default: 'guest'
  },
  isActive: {
    type: Boolean,
  },
  totalSpend: {
    type: Number
  },
  totalOrders: {
    type: Number
  },
  loyaltyPoints: {
    type: Number
  },
  refreshToken: {
    type: String,
  },
  refreshTokenExpiresTime: {
    type: Date
  },
  lastlogin: {
    type: Date,
    default: Date.now()
  },
  accountTypes: {
    type: String,
    enum: ['REGISTERED', 'GUEST'],
    default: "REGISTERED"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date

})
module.exports = mongoose.model("User", UserSchema)