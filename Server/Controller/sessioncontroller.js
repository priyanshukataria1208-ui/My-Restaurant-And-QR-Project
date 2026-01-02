const Session = require("../Models/session");
const Table = require("../Models/table");
const crypto = require("crypto");
const { successResponse } = require("../utlis/successResponse");

exports.session = async (req, res, next) => {
   try {
    const { deviceId, qrSlug } = req.body;

    //using this qrSlug i will find the tables where the user scans the qr
    const table = await Table.findOne({ qrSlug });
    console.log(table);

    const tableNumber = Table.tableNumber;
    const sessionToken = crypto.randomBytes(32).toString('hex');
    console.log(sessionToken);  //expiry time ?

    const expiresAt = new Date() ;
    expiresAt.setHours(expiresAt.getHours() + 24) ;
console.log(expiresAt.toLocaleString())
    //fetch session token => expiresAt : {$gt : new Date()}
    const session = new Session({
      deviceId ,  tableNumber , sessionToken ,expiresAt
    })
await session.save() ;

successResponse(res, 201 , session)

  } catch (error) {
    next(error)
  }

};
