const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  managerDashboard,
  getVehicles,
  createVehicle,
  toggleVehicleStatus,
} = require("../controllers/managerController");

router.get("/dashboard", protect, managerDashboard,);
router.get("/vehicles", protect, getVehicles,);
router.post("/vehicle", protect, createVehicle);
router.patch("/vehicle/:id/status", protect, toggleVehicleStatus);

module.exports = router;
