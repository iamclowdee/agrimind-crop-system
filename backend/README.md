# AgriMind Backend

This is the first backend version for AgriMind. It exposes an API that can receive crop and soil inputs, then return a crop recommendation.

## What this backend does right now

- Starts a local API server
- Provides a health check route
- Provides a crop recommendation route
- Uses the same crop recommendation rules that currently exist in the frontend

## Folder structure

```text
backend/
  package.json
  .env.example
  src/
    server.js
    routes/
      cropRoutes.js
    controllers/
      cropController.js
    services/
      cropRecommendationService.js
    data/
      crops.js
```

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
copy .env.example .env
```

Start the backend:

```bash
npm run dev
```

The API should run at:

```text
http://localhost:5000
```

## Test the recommendation API

Send a `POST` request to:

```text
http://localhost:5000/api/crops/recommend
```

Example JSON body:

```json
{
  "nitrogen": 90,
  "phosphorus": 40,
  "potassium": 40,
  "temperature": 30,
  "humidity": 80,
  "ph": 6.5,
  "rainfall": 200,
  "area": 2,
  "soil": "clay"
}
```
