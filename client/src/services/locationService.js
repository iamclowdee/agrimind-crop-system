import api from "../api/axios";

export const reverseGeocode = async (

    latitude,

    longitude

) => {

    const response = await fetch(

        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

    );

    const data = await response.json();

    return {

        location:

            data.address.city ||

            data.address.town ||

            data.address.village ||

            "",

        district:

            data.address.county ||

            "",

        region:

            data.address.state ||

            "",

        displayName:

            data.display_name,

    };

};

export const searchLocation = async (query) => {

    const response =
        await api.get(

            `/location/search?q=${encodeURIComponent(query)}`

        );

    return response.data.locations;

};