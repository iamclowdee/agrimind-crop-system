const BACKEND_API = "http://localhost:5000";

export async function getRecommendation(data) {

    const response = await fetch(
        `${BACKEND_API}/predict`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return response.json();
}