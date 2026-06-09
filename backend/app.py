from datetime import datetime
from mongo_db import predictions_collection
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model once when server starts
model = joblib.load("model/crop_model_v2.pkl")
print(model.feature_names_in_)


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
            "rainfall": float(data["rainfall"]),
            "soil_moisture": float(data["soil_moisture"]),
            "organic_carbon": float(data["organic_carbon"]),
            "electrical_conductivity": float(data["electrical_conductivity"]),
            "season": data["season"],
            "soil_color": data["soil_color"],
            "region": data["region"],
            "district_name": data["district_name"]
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

        # predictions_collection.insert_one(prediction_record)

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
    app.run(debug=True)