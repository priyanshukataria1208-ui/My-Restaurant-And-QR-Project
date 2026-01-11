const Table = require("../Models/table");
const crypto = require("crypto");
const QRCode = require("qrcode");
const { successResponse } = require("../utlis/successResponse");
const os = require("os")



exports.Createtable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    // Check duplicate
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({
        success: false,
        message: `Table number ${tableNumber} already exists`,
      });
    }

    // ✅ Generate QR slug and URL
    const qrSlug = crypto.randomBytes(6).toString("hex");

    // Get local IP (adjust interface name if needed)
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = "localhost"; // fallback
    if (networkInterfaces["Wi-Fi"]) {
      for (const el of networkInterfaces["Wi-Fi"]) {
        if (el.family === "IPv4") ipAddress = el.address;
      }
    }

    const qrCodeUrl = `http://${ipAddress}:5173/welcome?qr=${qrSlug}`;

    // ✅ Generate QR code as data URL
    const qrImage = await QRCode.toDataURL(qrCodeUrl);

    // ✅ Create table with all fields
    const table = await Table.create({
      tableNumber,
      capacity,
      qrSlug,
      qrCodeUrl,
      qrImage,
    });

    // ✅ Send single response
    res.status(201).json({
      success: true,
      data: table,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getTableBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const table = await Table.findOne({ qrSlug: slug });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};

exports.getAllTable = async (req, res, next) => {
  try {
    const table = await Table.find();
    if (table.length <= 0) {
      return res.status(404).json({ message: "No tables found" });
    }
    return res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};

exports.deleteTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    await Table.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Table deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updatetable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      { tableNumber, capacity },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json(updatedTable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
