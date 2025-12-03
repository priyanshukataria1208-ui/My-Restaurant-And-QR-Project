const express = require("express");
const cors = require("cors");
const app = express();
require('events').EventEmitter.defaultMaxListeners = 20; // 🔥 Prevent MaxListeners warning

// JSON Parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// DB Connect (Only once!)
const dbconnect = require("./config/database");
dbconnect();

// Middleware
const verifytoken = require("./middleware/verifytoken");
const { default: checkRole } = require("./middleware/checkRole");

// Public routes
const Frontendroute = require("./Router/Frontendroute");
app.use("/api/v1", Frontendroute);

const Tableroute=require("./Router/tablerouter")
app.use("/api/v1",Tableroute)

// Protected Route Example
app.get(
  "/menu",
  verifytoken,
  checkRole(["customer", "admin"]),
  (req, res) => {
    res.json({ message: "Menu Loaded Successfully (Protected Route)" });
  }
);

// Static Files
app.use(express.static("public"));

// Start Server (Only once!)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
