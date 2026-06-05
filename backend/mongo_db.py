from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["agrimind"]

predictions_collection = db["predictions"]
users_collection = db["users"]
feedback_collection = db["feedback"]