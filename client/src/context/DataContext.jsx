import {

    createContext,

    useContext,

    useState,

} from "react";

const DataContext = createContext();

export function DataProvider({ children }) {

    // ==========================================
    // Latest Prediction Result
    // ==========================================

    const [

        result,

        setResult,

    ] = useState(null);

    // ==========================================
    // Soil Health Data
    // ==========================================

    const [

        soilData,

        setSoilData,

    ] = useState(null);

    // ==========================================
    // Prediction History
    // ==========================================

    const [

        history,

        setHistory,

    ] = useState([]);

    // ==========================================
    // Analytics
    // ==========================================

    const [

        analytics,

        setAnalytics,

    ] = useState({

        totalInvestment: 0,

        totalRevenue: 0,

        totalProfit: 0,

        totalPredictions: 0,

    });

    // ==========================================
    // Current Location
    // ==========================================

    const [

        currentLocation,

        setCurrentLocation,

    ] = useState(null);

    // ==========================================
    // Global Loading
    // ==========================================

    const [

        loading,

        setLoading,

    ] = useState(false);

    return (

        <DataContext.Provider

            value={{

                // Prediction

                result,

                setResult,

                // Soil

                soilData,

                setSoilData,

                // History

                history,

                setHistory,

                // Analytics

                analytics,

                setAnalytics,

                // Location

                currentLocation,

                setCurrentLocation,

                // Loading

                loading,

                setLoading,

            }}

        >

            {children}

        </DataContext.Provider>

    );

}

export const useData = () =>

    useContext(DataContext);