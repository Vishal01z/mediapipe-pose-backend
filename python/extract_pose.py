import sys
import json
import cv2
import mediapipe as mp
import os

image_path = sys.argv[1]

if not os.path.exists(image_path):
    print(json.dumps({"error": "Image not found"}))
    sys.exit(1)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True)

image = cv2.imread(image_path)

if image is None:
    print(json.dumps({"error": "Invalid image"}))
    sys.exit(1)

image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
results = pose.process(image_rgb)

keypoints = []

if results.pose_landmarks:
    for lm in results.pose_landmarks.landmark:
        keypoints.append({
            "x": lm.x,
            "y": lm.y,
            "z": lm.z,
            "visibility": lm.visibility
        })

print(json.dumps(keypoints))
