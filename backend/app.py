import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Enhanced CORS configuration for production (update origins as needed)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],  # Set to your production frontend URL
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')  # Set to your production frontend URL
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Load your model
model = load_model('deepfake_detect.h5')

# Load OpenCV Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

def crop_face(frame):
    """Detect and crop face from frame"""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    for (x, y, w, h) in faces:
        return frame[y:y+h, x:x+w]
    return None

def preprocess_frame(frame):
    """Crop face, resize, normalize"""
    face = crop_face(frame)
    if face is None:
        return None
    face = cv2.resize(face, (256, 256))
    face = face.astype('float32') / 255.0
    return face

def extract_frames(video_path, num_frames=30):
    """Extract frames and preprocess"""
    frames = []
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_interval = max(total_frames // num_frames, 1)

    for i in range(num_frames):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i * frame_interval)
        ret, frame = cap.read()
        if ret:
            preprocessed = preprocess_frame(frame)
            if preprocessed is not None:
                frames.append(preprocessed)

    cap.release()
    return frames

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    temp_path = 'temp_video.mp4'
    file.save(temp_path)

    try:
        frames = extract_frames(temp_path, num_frames=30)

        if len(frames) < 5:
            return jsonify({'error': f'Not enough valid frames with faces (got {len(frames)})'}), 400

        preds = []
        for i, frame in enumerate(frames):
            frame_input = np.expand_dims(frame, axis=0)
            pred = model.predict(frame_input, verbose=0)[0][0]
            preds.append(pred)
            logger.info(f"Frame {i+1}: {pred:.4f}")  # Production logging

        avg_pred = np.mean(preds)
        result = "Genuine" if avg_pred > 0.5 else "Deepfake"

        if os.path.exists(temp_path):
            os.remove(temp_path)

        return jsonify({
            'result': result,
            'confidence': float(avg_pred),
            'status': 'success'
        })

    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    # For production, use a WSGI server like gunicorn or waitress
    # Example: gunicorn -w 4 app:app
    app.run(host='0.0.0.0', port=5001, debug=False)
