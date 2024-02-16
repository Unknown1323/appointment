const appointmentService = require("../repositories/appointmentRepository");

async function createAppointment(req, res) {
  try {
    const { user_id, doctor_id, slot } = req.body;
    await appointmentService.createAppointment(user_id, doctor_id, slot);
    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create appointment", message: error.message });
  }
}

module.exports = {
  createAppointment,
};
