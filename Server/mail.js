const nodemailer=require("nodemailer")
 
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "priyanshukataria1208@gmail.com",
    pass: 'nhct ekde dyiy awez',
  },
});
 
// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: 'priyanshukataria1208@gmail.com',
    to: "priyanshukataria1208@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
 
  console.log("Message sent:", info.messageId);
})();