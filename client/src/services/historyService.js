import api from "../api/axios";

export const updatePrediction = async (id, data) => {

    const response = await api.put(

        `/predict/${id}`,

        data

    );

    return response.data;

};

export const deletePrediction = async (id) => {

    const response = await api.delete(

        `/predict/${id}`

    );

    return response.data;

};