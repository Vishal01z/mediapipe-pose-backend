const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { exec } = require("child_process");
const { sendBackupEmail } = require("../services/email.service");


cron.schedule("* * * * *", async () => {
  console.log("Daily backup started...");

  const date = new Date().toISOString().split("T")[0];
  const backupDir = path.join(__dirname, "../../backups");
  const tempDir = path.join(backupDir, "temp");
  const zipPath = path.join(backupDir, `${date}-backup.zip`);

  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  // 1️⃣ MySQL dump
  exec(
    `mysqldump -u root -proot keypoint_db > ${tempDir}/mysql.sql`,
    (err) => {
      if (err) {
        console.error("MySQL dump failed", err);
        return;
      }

      // 2️⃣ MongoDB dump
      exec(
        `mongodump --db keypoint_images --out ${tempDir}/mongo`,
        (err) => {
          if (err) {
            console.error("Mongo dump failed", err);
            return;
          }

          // 3️⃣ Zip everything
          const output = fs.createWriteStream(zipPath);
          const archive = archiver("zip", { zlib: { level: 9 } });

          archive.pipe(output);
          archive.directory(tempDir, false);
          archive.finalize();

         output.on("close", async () => {
  console.log("Backup ZIP created:", zipPath);
  await sendBackupEmail(zipPath, date);
});
        }
      );
    }
  );
});
