# Deepfake-AI

## Features
- **Deepfake Detection:** Upload a video and receive a prediction (Genuine or Deepfake) with confidence.
- **Face Detection:** Uses OpenCV to focus on faces in video frames for more accurate analysis.
- **Modern UI:** React frontend with Tailwind CSS and Framer Motion for smooth user experience.
- **REST API:** Flask backend with a `/predict` endpoint for video analysis.

## Project Structure
```
deepfake-ai/
  backend/           # Flask backend for deepfake detection
    app.py           # Main backend application
    deepfake_detect.h5 # Pre-trained Keras model for detection
    requirements.txt # Backend dependencies
    uploads/         # (Empty) Directory for uploads (if needed)
  frontend/          # React frontend
    src/             # React source code
      components/    # VideoUploader and other components
      assets/        # Images and illustrations
    index.html       # Main HTML file
    package.json     # Frontend dependencies and scripts
  README.md          # Project documentation
```

## Backend Setup
1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. **Ensure model file is present:**
   - The file `deepfake_detect.h5` (Keras model) must be in the `backend/` directory.
3. **Run the backend server:**
   ```bash
   python app.py
   ```
   - The backend will start on `http://localhost:5001`.

## Frontend Setup
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   - The frontend will start on `http://localhost:5173`.

## Usage
1. Open the frontend in your browser: [http://localhost:5173](http://localhost:5173)
2. Upload a video file (preferably with a clear face visible).
3. Click "Check for Deepfake".
4. View the result and confidence score.

## API
### POST `/predict`
- **Description:** Analyze a video for deepfake detection.
- **Request:** Multipart form with a `file` field (video file).
- **Response:**
  - `result`: "Genuine" or "Deepfake"
  - `confidence`: Float (0-1)
  - `status`: "success" or "error"

## Requirements
### Backend
- Python 3.7+
- Flask
- Flask-CORS
- OpenCV
- NumPy
- TensorFlow

### Frontend
- React
- npm

## Notes
- The backend uses CORS to allow requests from the frontend during development.
- The `uploads/` directory is present for potential file storage but is not used by default.
- The deepfake detection model (`deepfake_detect.h5`) is required and not included in this repository.

## License
MIT (or specify your license) 

## Contact
For questions, support, or to get in touch with the Deepfake-AI team, please visit the website and use the contact or feedback section provided. We welcome your feedback and inquiries! 