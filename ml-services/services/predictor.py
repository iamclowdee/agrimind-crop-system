# services/predictor.py

from services.feature_engineering import build_features


def predict_crop(data, model, label_encoder):

    features = build_features(data)

    prediction_encoded = int(
        model.predict(features)[0]
    )

    prediction = str(
        label_encoder.inverse_transform(
            [prediction_encoded]
        )[0]
    )

    probabilities = model.predict_proba(features)[0]

    crop_names = label_encoder.classes_

    top_predictions = sorted(

        zip(crop_names, probabilities),

        key=lambda x: float(x[1]),

        reverse=True

    )[:5]

    confidence = float(

        round(

            float(max(probabilities)) * 100,

            2

        )

    )

    return {

        "recommended_crop": prediction,

        "confidence": confidence,

        "top_recommendations": [

            {

                "crop": str(crop),

                "probability": float(

                    round(

                        float(prob) * 100,

                        2

                    )

                )

            }

            for crop, prob in top_predictions

        ]

    }