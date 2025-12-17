const express = require("express");
const cors = require("cors");

require("./config/db.mongo"); // 👈 add this

const poseRoutes = require("./routes/pose.routes");
require("./cron/dailyBackup");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", poseRoutes);

app.get("/", (req, res) => {
  res.send("Keypoint Backend API Running");
});

module.exports = app;
