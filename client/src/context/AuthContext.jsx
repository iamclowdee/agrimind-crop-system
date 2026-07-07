import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {

    loginUser,

    registerUser,

    getProfile,

} from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] =
        useState(true);


        

    // =====================================
    // Load Logged-in User
    // =====================================

    useEffect(() => {

        const loadProfile = async () => {

            const token =
                localStorage.getItem("token");

            if (!token) {

                setLoading(false);

                return;

            }

            try {

                const response =
                    await getProfile();

                setUser(
                    response.data.user
                );

            }

            catch (error) {

                localStorage.removeItem(
                    "token"
                );

                setUser(null);

            }

            finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);

    // =====================================
    // Login
    // =====================================

    const login = async (

        email,

        password

    ) => {

        try {

            const response =
                await loginUser({

                    email,

                    password,

                });

            localStorage.setItem(

                "token",

                response.data.token

            );

            setUser(

                response.data.user

            );

            navigate("/dashboard");

            return {

                success: true,

            };

        }

        catch (error) {

            return {

                success: false,

                message:

                    error.response?.data?.message ||

                    "Login failed.",

            };

        }

    };

    // =====================================
    // Signup
    // =====================================

    const signup = async (

        userData

    ) => {

        try {

            const response =
                await registerUser(

                    userData

                );

            localStorage.setItem(

                "token",

                response.data.token

            );

            setUser(

                response.data.user

            );

            navigate("/dashboard");

            return {

                success: true,

            };

        }

        catch (error) {

            return {

                success: false,

                message:

                    error.response?.data?.message ||

                    "Registration failed.",

            };

        }

    };

    // =====================================
    // Logout
    // =====================================

    const logout = () => {

        localStorage.removeItem(

            "token"

        );

        setUser(null);

        navigate("/");

    };

    // =====================================
    // Protected Routes
    // =====================================

    const requireAuth = (route) => {

        if (!user) {

            navigate("/login");

            return;

        }

        navigate(route);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                signup,

                logout,

                requireAuth,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

// =====================================
// Custom Hook
// =====================================

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used within AuthProvider"
        );

    }

    return context;

}