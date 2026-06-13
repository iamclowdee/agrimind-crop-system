# AgriMind Frontend-Backend Integration Guide

## ✅ Integration Complete

Your frontend and backend are now fully integrated! Here's what has been configured:

### Frontend Updates
1. **API Endpoint Configuration**: Frontend now calls `http://127.0.0.1:5000/predict` ✓
2. **Expanded Crop Database**: Added 24 crop types with details, tips, and emojis ✓
3. **Backend Health Check**: Frontend checks if Flask is running on page load ✓
4. **Error Handling**: Improved error messages showing actual backend errors ✓
5. **Top Recommendations**: Frontend now displays top 5 crop recommendations from the ML model ✓

### Backend Updates
1. **Model Loading**: Correctly loads `crop_model_final.pkl` and `crop_label_encoder.pkl` ✓
2. **MongoDB Integration**: Graceful handling when MongoDB is not configured ✓
3. **Error Recovery**: Server starts even if MongoDB or model isn't available ✓
4. **Comprehensive Logging**: Detailed startup messages for debugging ✓

## 🚀 Running the System

### Step 1: Start Flask Backend
```bash
cd backend
python app.py
```

You should see:
```
✓ Model loaded successfully
✓ Label encoder loaded successfully
🚀 Starting AgriMind API on http://localhost:5000
```

### Step 2: Open Frontend
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Run a local server
python -m http.server 8000
# Then open http://localhost:8000
```

### Step 3: Test the Prediction
1. Fill in the recommendation form with sample values
2. Click "Get Recommendation"
3. You should get a crop prediction with confidence score and top 5 recommendations

## 📋 Current Configuration

### Frontend
- **Backend URL**: `http://127.0.0.1:5000`
- **Endpoint**: `/predict` (POST)
- **Health Check**: Runs automatically on page load
- **Timeout**: Configured for typical prediction latency

### Backend
- **Host**: `127.0.0.1` (localhost only)
- **Port**: `5000` (configurable via `FLASK_PORT` env variable)
- **Models**: Located in `backend/model/`
  - `crop_model_final.pkl` - ML Model
  - `crop_label_encoder.pkl` - Label Encoder

## 🔧 Configuration Files

### `.env` (Backend)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/agrimind
FLASK_PORT=5000
FLASK_ENV=development
```

### Expected Crops
The system currently supports these crops:
- Rice, Wheat, Cotton, Maize
- Sugarcane, Soybean, Pulses, Groundnut, Sunflower, Mustard
- Tomato, Onion, Potato, Cabbage, Carrot
- Coconut, Coffee, Tea
- Mango, Apple, Banana, Grapes, Papaya, Peach

## 🐛 Troubleshooting

### "Prediction failed" Error
**Solution**: Make sure Flask is running with `python backend/app.py`

### Model file not found
**Check**: Ensure `crop_model_final.pkl` and `crop_label_encoder.pkl` exist in `backend/model/`

### MongoDB warnings but predictions work
**This is normal**: The system works fine without MongoDB. Predictions are processed but not stored in the database.

### CORS errors in browser console
**This is expected**: CORS is already configured in Flask. If errors persist, check that Flask is running on port 5000.

## 📊 API Reference

### POST `/predict`
**Request**:
```json
{
  "nitrogen": 50,
  "phosphorus": 40,
  "potassium": 30,
  "temperature": 25,
  "humidity": 70,
  "ph": 6.5,
  "rainfall": 200,
  "soil_moisture": 45,
  "organic_carbon": 0.5,
  "electrical_conductivity": 1.2,
  "season": "Kharif",
  "soil_color": "Brown"
}
```

**Response**:
```json
{
  "success": true,
  "recommended_crop": "Rice",
  "confidence": 85.5,
  "top_recommendations": [
    {"crop": "Rice", "probability": 85.5},
    {"crop": "Maize", "probability": 10.2},
    ...
  ]
}
```

### GET `/`
Returns: `"AgriMind API Running"`

### GET `/test-db`
Returns MongoDB connection status

## ✨ Next Steps

1. **Customize Crops**: Add more crops to `script.js` in the `cropInfo` object
2. **Deploy to Production**: Configure HTTPS and use a production WSGI server
3. **Add Authentication**: Integrate with your backend user system
4. **Enable Geolocation**: The app already fetches user location using OpenStreetMap
5. **Add Soil Health Analysis**: Build additional endpoints for soil testing

## 📝 Notes
- Frontend uses localStorage for user sessions (no server-side required)
- Predictions are real ML model predictions (not fake logic)
- System gracefully degrades if MongoDB is unavailable
- All timestamps are in UTC
