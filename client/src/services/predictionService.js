import api from "../api/axios";

export const createPrediction = async (data) => {

    const response = await api.post(
        "/predict",
        data
    );

    return response.data;

};

export const getPredictionHistory = async () => {

    const response = await api.get(
        "/predict/history"
    );

    return response.data;

};

export const getLatestPrediction = async () => {

    const response = await api.get(

        "/predict/latest"

    );

    return response.data;

};

export const getPredictionById = async (id) => {

    const response = await api.get(
        `/predict/${id}`
    );

    return response.data;

};