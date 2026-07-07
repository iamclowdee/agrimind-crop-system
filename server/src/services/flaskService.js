import axios from "axios";

const FLASK_URL =
    process.env.FLASK_URL?.trim() || "http://127.0.0.1:5000";

export const predictCrop = async (inputData) => {

    try {

        console.log(
            "Calling Flask:",
            `${FLASK_URL}/predict`
        );

        const response =
            await axios.post(

                `${FLASK_URL}/predict`,

                inputData

            );

        return response.data;

    }

    catch (error) {

        console.error(
            "Flask Service Error:",
            error.response?.data || error.message
        );

        throw new Error(

            error.response?.data?.error ||

            "Unable to connect to ML Service."

        );

    }

};