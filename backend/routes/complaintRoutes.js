const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createComplaint, getUserComplaints } = require("../controllers/complaintController");

// Routes
router.route("/")
  .post(protect, createComplaint)
  .get(protect, getUserComplaints);

module.exports = router;
