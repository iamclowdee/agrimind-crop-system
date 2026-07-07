# services/model_loader.py

import os
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_model_final.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_label_encoder.pkl"
)


def load_model():

    model = None
    encoder = None

    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("✓ Model Loaded")

    else:
        print("❌ Model not found")

    if os.path.exists(ENCODER_PATH):
        encoder = joblib.load(ENCODER_PATH)
        print("✓ Label Encoder Loaded")

    else:
        print("❌ Label Encoder not found")

    return model, encoder