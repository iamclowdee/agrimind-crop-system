const { pickCrop } = require("../services/cropRecommendationService");

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return NaN;
  }

  return Number(value);
}

function recommendCrop(req, res) {
  const nitrogen = toNumber(req.body.nitrogen);
  const phosphorus = toNumber(req.body.phosphorus);
  const potassium = toNumber(req.body.potassium);
  const temperature = toNumber(req.body.temperature);
  const humidity = toNumber(req.body.humidity);
  const ph = toNumber(req.body.ph);
  const rainfall = toNumber(req.body.rainfall);
  const area = toNumber(req.body.area);
  const soil = req.body.soil;

  const requiredValues = {
    nitrogen,
    phosphorus,
    potassium,
    temperature,
    humidity,
    ph,
    rainfall,
    area
  };

  const missingFields = Object.entries(requiredValues)
    .filter(([, value]) => Number.isNaN(value))
    .map(([field]) => field);

  if (!soil) {
    missingFields.push("soil");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing or invalid crop recommendation input.",
      missingFields
    });
  }

  const crop = pickCrop({ nitrogen, phosphorus, potassium, temperature, humidity, ph });

  return res.json({
    crop,
    input: {
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
      area,
      soil
    }
  });
}

module.exports = {
  recommendCrop
};
