const Table = require("../Models/table");
const crypto = require("crypto")
const QRCode=require("qrcode")

exports.Createtable = async(req, res) => {
    try {
        const { tableNumber, capacity } = req.body;


        // create qr slug;

        const qrSlug = crypto.randomBytes(6).toString("hex");
        console.log(qrSlug);

        const qrCodeUrl=`http://localhost:5173/welcome?qr=${qrSlug}`
        console.log(qrCodeUrl);



        const qrUrl=QRCode.toDataURL(qrCodeUrl,  function (err, url) {
  console.log(url)})

  
const qrImage = await QRCode.toDataURL(qrCodeUrl);
    console.log(qrImage);

    const table = new Table({
      tableNumber,
      capacity,
      qrCodeUrl,
      qrSlug,
      qrImage,
    });
    await table.save();

    res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    } 
}