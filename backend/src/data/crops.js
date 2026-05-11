const crops = [
  {
    name: "Rice (Paddy)",
    emoji: "🌾",
    season: "June–October",
    seasonType: "Kharif Season",
    duration: "90–120 days",
    confidence: 94,
    tips: [
      "Maintain 5–10 cm standing water during tillering",
      "Apply Urea in 3 splits: basal, tillering, panicle initiation",
      "Monitor for stem borer and brown planthopper weekly",
      "Transplant 25-day seedlings at 20×15 cm spacing",
      "Harvest at 85–90% grain maturity"
    ]
  },
  {
    name: "Wheat",
    emoji: "🌿",
    season: "November–March",
    seasonType: "Rabi Season",
    duration: "100–130 days",
    confidence: 89,
    tips: [
      "Sow at 20–22°C for best germination",
      "Apply phosphorus at sowing time",
      "Irrigate at crown root initiation stage",
      "Apply fungicide for rust control if needed",
      "Harvest when grain moisture is below 14%"
    ]
  },
  {
    name: "Maize",
    emoji: "🌽",
    season: "June–September",
    seasonType: "Kharif Season",
    duration: "75–90 days",
    confidence: 81,
    tips: [
      "Ensure well-drained soil before sowing",
      "Side-dress nitrogen at knee-high stage",
      "Control fall armyworm with timely spraying",
      "Thin seedlings to one per hill after germination",
      "Harvest when husk turns brown and grains are hard"
    ]
  },
  {
    name: "Chickpea",
    emoji: "🫘",
    season: "October–February",
    seasonType: "Rabi Season",
    duration: "90–110 days",
    confidence: 76,
    tips: [
      "Do not over-irrigate — chickpea is drought-tolerant",
      "Apply Rhizobium inoculant for nitrogen fixation",
      "Control pod borer with recommended insecticide",
      "Avoid waterlogging at any stage",
      "Harvest when leaves turn yellow and pods rattle"
    ]
  },
  {
    name: "Mango",
    emoji: "🥭",
    season: "March–June",
    seasonType: "Summer",
    duration: "120–150 days",
    confidence: 72,
    tips: [
      "Prune after harvest for better aeration",
      "Apply balanced NPK before flowering",
      "Manage powdery mildew with sulphur spray",
      "Thin fruits to improve size and quality",
      "Harvest when fruits reach full size and show color change"
    ]
  }
];

module.exports = crops;
