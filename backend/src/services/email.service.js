const nodemailer = require("nodemailer");

exports.sendBackupEmail = async (filePath, date) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Daily DB Backup - ${date}`,
    text: "Please find attached the daily database backup.",
    attachments: [
      {
        filename: `${date}-backup.zip`,
        path: filePath
      }
    ]
  });

  console.log("Backup email sent successfully");
};
