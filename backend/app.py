from datetime import datetime
from mongo_db import predictions_collection
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import sys

app = Flask(__name__)
CORS(app)

# Load trained model once when server starts
model_path = os.path.join(os.path.dirname(__file__), "model", "crop_model_v2.pkl")

if not os.path.exists(model_path):
    print(f"ERROR: Model file not found at {model_path}")
    print("Please ensure the trained model file exists before running the server.")
    sys.exit(1)

try:
    model = joblib.load(model_path)
    print("✓ Model loaded successfully")
except Exception as e:
    print(f"ERROR: Failed to load model: {e}")
    sys.exit(1)

@app.route("/")
def home():
    return "AgriMind API Running"

@app.route("/test-db")
def test_db():

    count = predictions_collection.count_documents({})

    return jsonify({
        "status": "connected",
        "prediction_count": count
    })

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.json

        features = pd.DataFrame([{
            "nitrogen": float(data["nitrogen"]),
            "phosphorus": float(data["phosphorus"]),
            "potassium": float(data["potassium"]),
            "temperature": float(data["temperature"]),
            "humidity": float(data["humidity"]),
            "ph": float(data["ph"]),
            "rainfall": float(data["rainfall"])
        }])

        prediction = model.predict(features)[0]

        probabilities = model.predict_proba(features)[0]

        confidence = round(max(probabilities) * 100, 2)

        prediction_record = {
        "nitrogen": float(data["nitrogen"]),
        "phosphorus": float(data["phosphorus"]),
        "potassium": float(data["potassium"]),
        "temperature": float(data["temperature"]),
        "humidity": float(data["humidity"]),
        "ph": float(data["ph"]),
        "rainfall": float(data["rainfall"]),
        "recommended_crop": prediction,
        "confidence": confidence,
        "created_at": datetime.utcnow()
        }

        predictions_collection.insert_one(prediction_record)

        return jsonify({
        "success": True,
        "recommended_crop": prediction,
        "confidence": confidence
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })


if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    print(f"🚀 Starting AgriMind API on http://localhost:{port}")
    app.run(debug=True, host="127.0.0.1", port=port)