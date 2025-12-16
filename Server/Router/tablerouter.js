const router = require("express").Router();
const TableC = require("../Controller/tablecontroller");
const {default: checkRole} = require("../middleware/checkRole");
const verifytoken = require("../middleware/verifytoken");

// Create table
router.post("/table",  TableC.Createtable);

// Get table by slug
router.get("/table/:slug", TableC.getTableBySlug);

// Get all tables (Admin only)
router.get("/table", verifytoken, checkRole(["admin"]), TableC.getAllTable);

// Delete table (Admin only)
router.delete("/table/:id", verifytoken, checkRole(["admin"]), TableC.deleteTable);

// Update table (Admin only)
router.put("/table/:id", verifytoken, checkRole(["admin"]), TableC.updatetable);

module.exports = router;
