const mongoose = require("mongoose")

const tableSchema = mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true,


    },
    qrSlug: {
        type: String,
        required: true,
    },
    qrCodeUrl: {
        type: String,

    },
    qrImage: {
        type: String,
    },
    capacity: {
        type: Number
    }
});
module.exports = mongoose.model("table", tableSchema)