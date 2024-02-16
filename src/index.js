const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/appointmentRoutes");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const app = express();

dotenv.config();
dbConnect();

app.use(bodyParser.json());

app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
