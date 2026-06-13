import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (accuracy_score, classification_report)

df = pd.read_csv("data/master_agriculture_dataset (1).csv")

print("Original rows:", len(df))

crop_counts = df["crop"].value_counts()

valid_crops = crop_counts[crop_counts >= 50].index

df = df[df["crop"].isin(valid_crops)]

print("Filtered rows:", len(df))

print("\nRemaining Crops:")
print(df["crop"].value_counts())

df["np_ratio"] = df["nitrogen"] / (df["phosphorus"] + 1)

df["nk_ratio"] = df["nitrogen"] / (df["potassium"] + 1)

df["pk_ratio"] = df["phosphorus"] / (df["potassium"] + 1)

numeric_features = [
    "nitrogen",
    "phosphorus",
    "potassium",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
    "soil_moisture",
    "organic_carbon",
    "electrical_conductivity",
    "np_ratio",
    "nk_ratio",
    "pk_ratio"
]

categorical_features = [
    "season",
    "soil_color"
    
]

X = df[numeric_features + categorical_features]
label_encoder = LabelEncoder()

y = label_encoder.fit_transform(df["crop"])

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        )
    ],
    remainder="passthrough"
)

model = Pipeline([
    ("preprocessor", preprocessor),
    (
    "classifier",
        XGBClassifier(
            n_estimators=800,
            max_depth=10,
            learning_rate=0.03,
            subsample=0.9,
            colsample_bytree=0.9,
            random_state=42,
            tree_method="hist",
            eval_metric="mlogloss"
        )
    )
])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy * 100:.2f}%")

print(
    classification_report(
        y_test,
        predictions,
        zero_division=0
    )
)

joblib.dump(
    model,
    "model/crop_model_final.pkl"
)

joblib.dump(
    label_encoder,
    "model/crop_label_encoder.pkl"
)

print("Model saved.")

# Model Classifier
classifier = model.named_steps["classifier"]

feature_names = model.named_steps[
    "preprocessor"
].get_feature_names_out()

for feature, importance in sorted(
    zip(feature_names, classifier.feature_importances_),
    key=lambda x: x[1],
    reverse=True
):
    print(feature, round(importance, 4))