import api from "../api/axios";

export const getLatestSoil = () =>
    api.get("/soil/latest");

export const getSoil = (id) =>
    api.get(`/soil/${id}`);