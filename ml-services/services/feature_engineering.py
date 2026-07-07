# services/feature_engineering.py

import pandas as pd


def build_features(data):

    nitrogen = float(data["nitrogen"])
    phosphorus = float(data["phosphorus"])
    potassium = float(data["potassium"])

    return pd.DataFrame([{

        "nitrogen": nitrogen,

        "phosphorus": phosphorus,

        "potassium": potassium,

        "temperature":
            float(data["temperature"]),

        "humidity":
            float(data["humidity"]),

        "ph":
            float(data["ph"]),

        "rainfall":
            float(data["rainfall"]),

        "soil_moisture":
            float(data["soil_moisture"]),

        "organic_carbon":
            float(data["organic_carbon"]),

        "electrical_conductivity":
            float(data["electrical_conductivity"]),

        "np_ratio":
            nitrogen /
            (phosphorus + 1),

        "nk_ratio":
            nitrogen /
            (potassium + 1),

        "pk_ratio":
            phosphorus /
            (potassium + 1),

        "season":
            data["season"],

        "soil_color":
            data["soil_color"]

    }])