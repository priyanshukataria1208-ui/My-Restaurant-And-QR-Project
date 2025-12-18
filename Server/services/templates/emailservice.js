const nodemailer=require("nodemailer")
 
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "priyanshukataria1208@gmail.com",
    pass: 'nhct ekde dyiy awez',
  },
});

 module.exports=transporter
