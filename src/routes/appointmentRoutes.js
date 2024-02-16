const express = require("express");
const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

router.post("/appointment", appointmentController.createAppointment);

module.exports = router;
