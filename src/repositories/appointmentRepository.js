const { request } = require("express");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const cronService = require("../services/cronService");

async function createAppointment(user_id, doctor_id, slot) {
  try {
    const user = await User.findById({ _id: user_id });
    if (!user) {
      throw new Error("User not found!");
    }

    const doctor = await Doctor.findById({ _id: doctor_id });
    if (!doctor) {
      throw new Error("Doctor not found!");
    }

    const requestedSlot = new Date(slot).toISOString();
    const isSlotOccupied = doctor.slots.some(
      (date) => date.toISOString() === requestedSlot
    );

    if (isSlotOccupied) {
      throw new Error("Цей слот вже зайнятий");
    }
    await Doctor.findOneAndUpdate(
      { _id: doctor_id },
      { $push: { slots: requestedSlot } },
      { new: true }
    );

    // Создаем напоминание о приеме
    await cronService.scheduleReminderJobs(user, slot, doctor);
  } catch (error) {
    throw new Error("Failed to create appointment: " + error.message);
  }
}

module.exports = {
  createAppointment,
};
