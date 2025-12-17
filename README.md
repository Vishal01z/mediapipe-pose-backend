📘 README.md (FINAL – Internship Submission Ready)
Project Title

Full-Stack Backend System for Keypoint & Image Capture using MediaPipe

📌 Objective

This project is a backend system that:

Extracts human body keypoints from images using MediaPipe Pose

Stores extracted keypoints in an SQL database (MySQL)

Stores original images in a NoSQL database (MongoDB)

Provides a REST API for pose extraction

Runs a daily cron job to back up SQL and MongoDB data into a ZIP file

Sends a daily backup email with ZIP attachment

🛠 Tech Stack

Backend: Node.js, Express

SQL Database: MySQL

NoSQL Database: MongoDB

Image Processing: Python, MediaPipe, OpenCV

Cron Jobs: node-cron

Backup ZIP: archiver

Email Service: Nodemailer (SMTP)

📂 Project Structure
keypoint-backend/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── cron/
│   │   ├── config/
│   │   └── models/
│   ├── backups/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── python/
│   └── extract_pose.py
│
└── README.md

⚙️ Setup Instructions
1️⃣ Backend Setup (Node.js)
cd backend
npm install
npm start


Server will run on:

http://localhost:5000

2️⃣ MySQL Setup
CREATE DATABASE keypoint_db;
USE keypoint_db;

CREATE TABLE pose_keypoints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_id VARCHAR(255),
    keypoints JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3️⃣ MongoDB Setup

MongoDB Community Server installed

Service running on port 27017

Connection string:

mongodb://127.0.0.1:27017/keypoint_images

4️⃣ Python + MediaPipe Setup
cd python
python -m venv venv
venv\Scripts\activate
pip install mediapipe opencv-python numpy

🔗 API Usage
➤ Extract Pose Keypoints

Endpoint

POST /api/extract-pose


Request

Body type: form-data

Key: image

Value: image file (jpg/png)

Response

{
  "success": true,
  "imageId": "64f9...",
  "keypointsCount": 33
}

⏱ Cron Job Configuration

Runs daily at 11:59 PM

Exports:

MySQL database (mysqldump)

MongoDB database (mongodump)

Creates ZIP file:

/backups/YYYY-MM-DD-backup.zip


Cron expression:

59 23 * * *

📧 Email Notification

Backup ZIP sent via email

Subject:

Daily DB Backup - YYYY-MM-DD


Implemented using Nodemailer (SMTP)

📸 Screenshots (To Attach)

API response in Postman

MySQL table showing stored keypoints

MongoDB collection showing image record

Backup ZIP file generated

Email with ZIP attachment

✅ Final Status

✔ MediaPipe Pose (33 keypoints)
✔ SQL keypoints storage
✔ MongoDB image storage
✔ REST API
✔ Cron-based daily backup
✔ ZIP export
✔ Email notification

👨‍💻 Author

Vishal Suryavanshi
Software Engineer | Backend & Full-Stack Development