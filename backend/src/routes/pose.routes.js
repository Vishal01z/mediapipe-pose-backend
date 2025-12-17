const express = require("express");
const router = express.Router();
const multer = require("multer");
const poseController = require("../controllers/pose.controller");

const upload = multer({ dest: "uploads/" });

router.post("/extract-pose", upload.single("image"), poseController.extractPose);

module.exports = router;
