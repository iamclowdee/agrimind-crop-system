import { useState } from "react";

import "../../pages/Dashboard.css";

import {
    getCurrentLocation,
} from "../../services/currentLocationService";

import {
    reverseGeocode,
} from "../../services/locationService";

function MapSection() {

    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState(null);

    const [error, setError] = useState("");

    // ==========================================
    // Detect Current Location
    // ==========================================

    const handleCurrentLocation = async () => {

        setLoading(true);

        setError("");

        try {

            const coords =
                await getCurrentLocation();

            const address =
                await reverseGeocode(

                    coords.latitude,

                    coords.longitude

                );

            setLocation({

                ...address,

                latitude: coords.latitude,

                longitude: coords.longitude,

            });

        }

        catch {

            setError(

                "Unable to fetch your location."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="card">

            <div className="card-title">

                🗺 Live Location

            </div>

            <div className="card-sub">

                Detect your current location

            </div>

            <div className="map-container">

                {

                    loading ? (

                        <div

                            style={{

                                textAlign: "center",

                            }}

                        >

                            <div

                                style={{

                                    fontSize: "40px",

                                }}

                            >

                                🌍

                            </div>

                            <p>

                                Detecting location...

                            </p>

                        </div>

                    ) : location ? (

                        <div

                            style={{

                                textAlign: "center",

                            }}

                        >

                            <div

                                style={{

                                    fontSize: "40px",

                                }}

                            >

                                📍

                            </div>

                            <h3>

                                {location.location}

                            </h3>
                            <p>

                                {location.district}

                            </p>

                            <p>

                                {location.region}

                            </p>

                            <small>

                                Lat: {location.latitude.toFixed(5)}

                            </small>

                            <br />

                            <small>

                                Lon: {location.longitude.toFixed(5)}

                            </small>

                        </div>

                    ) : (

                        <div

                            style={{

                                textAlign: "center",

                            }}

                        >

                            <div

                                style={{

                                    fontSize: "40px",

                                }}

                            >

                                📍

                            </div>

                            <div>

                                Location not fetched yet

                            </div>

                            <small>

                                Allow location permission.

                            </small>

                        </div>

                    )

                }

            </div>

            {

                error && (

                    <p

                        style={{

                            color: "red",

                            marginTop: "10px",

                        }}

                    >

                        {error}

                    </p>

                )

            }

            <button

                className="btn-primary"

                onClick={handleCurrentLocation}

                disabled={loading}

            >

                {

                    loading

                        ? "Detecting..."

                        : "📍 Use Current Location"

                }

            </button>

        </div>

    );

}

export default MapSection;