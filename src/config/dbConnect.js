const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGOBD_URL);
    console.log("DB Connect Success");
    return conn;
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = dbConnect;
