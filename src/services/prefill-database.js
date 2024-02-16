const User = require("../models/User");
const Doctor = require("../models/Doctor");
const dbConnect = require("../config/dbConnect");
const dotenv = require("dotenv");
dotenv.config();

require("dotenv").config();
const prefillDatabase = async () => {
  let connection;
  try {
    connection = await dbConnect();

    await User.create([
      { phone: "+380115550011", name: "Іван" },
      { phone: "+380115550022", name: "Петро" },
    ]);

    await Doctor.create([
      { name: "Петр", spec: "Терапевт", slots: [] },
      { name: "Марія", spec: "Педіатр", slots: [] },
    ]);

    console.log("Database prefilling completed successfully.");
  } catch (error) {
    console.error("Database prefilling error:", error.message);
  } finally {
    connection.disconnect();
  }
};
prefillDatabase();
