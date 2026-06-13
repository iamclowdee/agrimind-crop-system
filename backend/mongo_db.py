from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("⚠️  WARNING: MONGO_URI not set in .env file")
    print("MongoDB features will not work until configured.")
    print("Please set MONGO_URI in backend/.env")
    client = None
    db = None
    predictions_collection = None
    users_collection = None
    feedback_collection = None
else:
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        # Verify connection
        client.admin.command('ping')
        db = client["agrimind"]
        predictions_collection = db["predictions"]
        users_collection = db["users"]
        feedback_collection = db["feedback"]
        print("✓ MongoDB connected successfully")
    except Exception as e:
        print(f"⚠️  MongoDB connection failed: {e}")
        print("Predictions will be stored locally only.")
        client = None
        db = None
        predictions_collection = None
        users_collection = None
        feedback_collection = None