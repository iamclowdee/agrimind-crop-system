from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model once when server starts
model = joblib.load("model/crop_model_v2.pkl")


@app.route("/")
def home():
    return "AgriMind API Running"


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