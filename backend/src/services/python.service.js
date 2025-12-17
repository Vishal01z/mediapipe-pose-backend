const { exec } = require("child_process");
const path = require("path");

const PYTHON_PATH = `"D:/Web Development/keypoint-backend/venv/Scripts/python.exe"`;


exports.runPythonScript = (imagePath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      __dirname,
      "../../../python/extract_pose.py"
    );

    const command = `${PYTHON_PATH} "${scriptPath}" "${imagePath}"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("Python error:", stderr);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
