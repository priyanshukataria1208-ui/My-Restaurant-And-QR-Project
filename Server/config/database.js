const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://priyanshukataria1208_db_user:aM050hOAod8DpYeE@cluster0.l55hips.mongodb.net/Restaurant?appName=Cluster0");
    console.log("DB Connected ✔️");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

module.exports = dbconnect;
