import { useEffect, useState } from "react";
import { searchLocation } from "../../../services/locationService";

function LocationInputs({ data, onChange }) {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {

        const delay = setTimeout(async () => {

            if (data.location.trim().length < 3) {

                setSuggestions([]);
                return;

            }

            try {

                const results = await searchLocation(
                    data.location
                );

                setSuggestions(results);

            }

            catch {

                setSuggestions([]);

            }

        }, 400);

        return () => clearTimeout(delay);

    }, [data.location]);

    return (

        <>

            {/* Location */}

            <div className="input-row">

                <label className="input-label">

                    📍 Location

                </label>

                <input

                    className="styled-input"

                    placeholder="Search location..."

                    value={data.location}

                    onChange={(e) =>
                        onChange(
                            "location",
                            e.target.value
                        )
                    }

                />

                {

                    suggestions.length > 0 && (

                        <div className="location-dropdown">

                            {

                                suggestions.map((place) => (

                                    <div

                                        key={place.id}

                                        className="location-item"

                                        onClick={() => {

                                            onChange(
                                                "location",
                                                place.name
                                            );

                                            onChange(
                                                "region",
                                                place.region
                                            );

                                            onChange(
                                                "latitude",
                                                place.latitude
                                            );

                                            onChange(
                                                "longitude",
                                                place.longitude
                                            );

                                            setSuggestions([]);

                                        }}

                                    >

                                        📍 {place.name}

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

            {/* Region */}

            <div className="input-row">

                <label className="input-label">

                    🗺️ Region

                </label>

                <input

                    className="styled-input"

                    placeholder="Region"

                    value={data.region}

                    onChange={(e) =>
                        onChange(
                            "region",
                            e.target.value
                        )
                    }

                />

            </div>

        </>

    );

}

export default LocationInputs;