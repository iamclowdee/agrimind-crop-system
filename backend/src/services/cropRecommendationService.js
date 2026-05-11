const crops = require("../data/crops");

function pickCrop({ temperature, humidity, ph }) {
  if (temperature > 28 && humidity > 70 && ph >= 6.0 && ph <= 7.5) {
    return crops[0];
  }

  if (temperature < 22 && ph >= 6.5 && ph <= 7.5) {
    return crops[1];
  }

  if (temperature > 20 && temperature <= 30 && humidity > 50) {
    return crops[2];
  }

  if (temperature < 25 && humidity < 60) {
    return crops[3];
  }

  return crops[Math.floor(Math.random() * crops.length)];
}

module.exports = {
  pickCrop
};
