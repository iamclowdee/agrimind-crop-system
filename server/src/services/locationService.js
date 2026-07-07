import axios from "axios";

export const searchLocation = async (query) => {

    if (!query || query.trim() === "") {
        return [];
    }

    const response = await axios.get(

        "https://nominatim.openstreetmap.org/search",

        {
            params: {
                q: query,
                format: "jsonv2",
                limit: 5,
                countrycodes: "in",
                addressdetails: 1,
            },

            headers: {
                "User-Agent": "AgriMind/1.0",
            },
        }

    );

    return response.data.map((place) => ({

    id: place.place_id,

    name: place.display_name,

    latitude: place.lat,

    longitude: place.lon,

    region:

        place.address?.state ||

        place.address?.province ||

        place.address?.county ||

        "",

}));

};