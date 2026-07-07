import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useData } from "../../../context/DataContext";
import { createPrediction } from "../../../services/predictionService";

import LocationInputs from "./LocationInputs";
import NutrientInputs from "./NutrientInputs";
import EnvironmentalInputs from "./EnvironmentalInputs";
import SoilInputs from "./SoilInputs";
import AdditionalInputs from "./AdditionalInputs";
import RecommendationActions from "./RecommendationActions";

import "../../../pages/Dashboard.css";

function RecommendationSection() {

    const navigate = useNavigate();

    const { setResult, setSoilData } = useData();

    const [formData, setFormData] = useState({

        // Location
        location: "",
        region: "",

        // Macronutrients
        nitrogen: "",
        phosphorus: "",
        potassium: "",

        // Weather
        temperature: "",
        humidity: "",
        rainfall: "",

        // Soil
        ph: "",
        soil_moisture: "",
        organic_carbon: "",
        electrical_conductivity: "",

        // Additional
        season: "",
        soil_color: "",

        // Optional (not sent to ML model)
        area: "",

        // Filled automatically by Location Search
        latitude: "",
        longitude: "",

    });

    // ======================================
    // Update Form
    // ======================================

    const handleChange = (name, value) => {

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    // ======================================
    // Clear Form
    // ======================================

    const clearForm = () => {

        setFormData({

            location: "",
            region: "",

            nitrogen: "",
            phosphorus: "",
            potassium: "",

            temperature: "",
            humidity: "",
            rainfall: "",

            ph: "",
            soil_moisture: "",
            organic_carbon: "",
            electrical_conductivity: "",

            season: "",
            soil_color: "",

            area: "",

            latitude: "",
            longitude: "",

        });

    };

    // ======================================
    // Predict Crop
    // ======================================

    const handlePredict = async () => {

    try {

        const payload = {

            nitrogen: Number(formData.nitrogen),

            phosphorus: Number(formData.phosphorus),

            potassium: Number(formData.potassium),

            temperature: Number(formData.temperature),

            humidity: Number(formData.humidity),

            rainfall: Number(formData.rainfall),

            ph: Number(formData.ph),

            soil_moisture: Number(formData.soil_moisture),

            organic_carbon: Number(formData.organic_carbon),

            electrical_conductivity: Number(
                formData.electrical_conductivity
            ),

            season: formData.season,

            soil_color: formData.soil_color,

            location: formData.location,

            region: formData.region,

            area: Number(formData.area),

        };

        const response = await createPrediction(payload);

        console.log(response);

        setResult(response.prediction);
        setSoilData({
        nitrogen: payload.nitrogen,
        phosphorus: payload.phosphorus,
        potassium: payload.potassium,
        ph: payload.ph,
        humidity: payload.humidity,});
        console.log("Soil data saved");

        setTimeout(() => {

    console.log("Context after save");
    console.log(payload);},1000);

        navigate("/result");

    }

    catch (error) {

        console.error(error);

        alert(

            error.response?.data?.message ||

            "Prediction failed."

        );

    }

};

    return (

        <div className="card">

            <div className="card-title">

                🌾 Crop Recommendation

            </div>

            <div className="card-sub">

                Enter soil and environmental parameters.

            </div>

            <div className="rec-form">

                <LocationInputs
                    data={formData}
                    onChange={handleChange}
                />

                <NutrientInputs
                    data={formData}
                    onChange={handleChange}
                />

                <EnvironmentalInputs
                    data={formData}
                    onChange={handleChange}
                />

                <SoilInputs
                    data={formData}
                    onChange={handleChange}
                />

                <AdditionalInputs
                    data={formData}
                    onChange={handleChange}
                />

            </div>

            <RecommendationActions
                onPredict={handlePredict}
                onClear={clearForm}
            />

        </div>

    );

}

export default RecommendationSection;