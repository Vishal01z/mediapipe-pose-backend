const { runPythonScript } = require("../services/python.service");

exports.extractPose = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await runPythonScript(req.file.path);

    res.json({
      success: true,
      keypoints: JSON.parse(result)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Pose extraction failed" });
  }
};
