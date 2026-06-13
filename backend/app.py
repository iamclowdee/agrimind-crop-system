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

# Load trained model and label encoder once when server starts
model_path = os.path.join(os.path.dirname(__file__), "model", "crop_model_final.pkl")
label_encoder_path = os.path.join(os.path.dirname(__file__), "model", "crop_label_encoder.pkl")

model = None
label_encoder = None

if not os.path.exists(model_path):
    print(f"⚠️  Model file not found at: {model_path}")
    print("Note: Predictions will not work until the trained model is placed in the model/ directory.")
else:
    try:
        model = joblib.load(model_path)
        print("✓ Model loaded successfully")
    except Exception as e:
        print(f"ERROR: Failed to load model: {e}")
        model = None

if not os.path.exists(label_encoder_path):
    print(f"⚠️  Label encoder not found at: {label_encoder_path}")
else:
    try:
        label_encoder = joblib.load(label_encoder_path)
        print("✓ Label encoder loaded successfully")
    except Exception as e:
        print(f"ERROR: Failed to load label encoder: {e}")
        label_encoder = None

@app.route("/")
def home():
    return "AgriMind API Running"

@app.route("/test-db")
def test_db():
    if predictions_collection is None:
        return jsonify({
            "status": "disconnected",
            "message": "MongoDB not configured. Set MONGO_URI in .env file."
        }), 503
    
    try:
        count = predictions_collection.count_documents({})
        return jsonify({
            "status": "connected",
            "prediction_count": count
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 503

@app.route("/predict", methods=["POST"])
def predict():

    if model is None or label_encoder is None:
        return jsonify({
            "success": False,
            "error": "Model or label encoder not loaded. Please ensure both files exist in backend/model/"
        }), 503

    try:
        data = request.json

        features = pd.DataFrame([{

            "nitrogen": float(data["nitrogen"]),
            "phosphorus": float(data["phosphorus"]),
            "potassium": float(data["potassium"]),
            "temperature": float(data["temperature"]),
            "humidity": float(data["humidity"]),
            "ph": float(data["ph"]),
            "rainfall": float(data["rainfall"]),
            "soil_moisture": float(data["soil_moisture"]),
            "organic_carbon": float(data["organic_carbon"]),
            "electrical_conductivity": float(data["electrical_conductivity"]),

            "np_ratio":
                float(data["nitrogen"]) /
                (float(data["phosphorus"]) + 1),

            "nk_ratio":
                float(data["nitrogen"]) /
                (float(data["potassium"]) + 1),

            "pk_ratio":
                float(data["phosphorus"]) /
                (float(data["potassium"]) + 1),

            "season": data["season"],
            "soil_color": data["soil_color"]

        }])

        prediction_encoded = model.predict(features)[0]

        prediction = label_encoder.inverse_transform(
            [prediction_encoded]
        )[0]

        print("PREDICTION:", prediction)

        probabilities = model.predict_proba(features)[0]

        crop_names = label_encoder.classes_

        top_predictions = sorted(
            zip(crop_names, probabilities),
            key=lambda x: x[1],
            reverse=True
        )[:5]

        print("TOP 5 RECOMMENDATIONS")

        for crop, prob in top_predictions:
            print(crop,round(prob * 100, 2))

        confidence = float(round(max(probabilities) * 100, 2))

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

        # Try to save to MongoDB if available
        if predictions_collection is not None:
            try:
                predictions_collection.insert_one(prediction_record)
            except Exception as db_error:
                print(f"Warning: Failed to save prediction to database: {db_error}")

        return jsonify({
            "success": True,
            "recommended_crop": prediction,
            "confidence": confidence,

            "top_recommendations": [
                {
                    "crop": crop,
                    "probability": float(round(prob * 100, 2))
                }
                for crop, prob in top_predictions
            ]
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