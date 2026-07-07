import { body } from "express-validator";

export const predictionValidator = [

    body("nitrogen").isNumeric(),

    body("phosphorus").isNumeric(),

    body("potassium").isNumeric(),

    body("temperature").isNumeric(),

    body("humidity").isNumeric(),

    body("ph").isNumeric(),

    body("rainfall").isNumeric(),

    body("soil_moisture").isNumeric(),

    body("organic_carbon").isNumeric(),

    body("electrical_conductivity").isNumeric(),

    body("season").notEmpty(),

    body("soil_color").notEmpty(),

];