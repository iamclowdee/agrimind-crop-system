export function calcSoilScore(soil) {
  let score = 50;

  if (
    soil.ph >= 6 &&
    soil.ph <= 7.5
  )
    score += 15;

  if (soil.n >= 50)
    score += 10;

  if (soil.p >= 40)
    score += 10;

  if (soil.k >= 40)
    score += 10;

  if (soil.hum >= 50)
    score += 5;

  return Math.min(score, 100);
}