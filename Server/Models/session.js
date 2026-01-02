const mongoose = require("mongoose");
const sessinonSchema = mongoose.Schema({
    sessionToken: {
        type: String,
        default: null

    },
    deviceId: {
        type: String,
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ip: { type: String },
    userAgent: { type: String },
    tableNumber: { type: Number },
    qrcodeUrl: { type: String },
    convertedSession: {
        type: Boolean,
        default: false
    },
    lastActivity: { type: Date },
    expiresAt: {
        type: Date
    },
})
module.exports = mongoose.model("session", sessinonSchema)