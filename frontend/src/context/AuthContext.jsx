import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        Boolean(localStorage.getItem("accessToken"))
    );

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setUser(Boolean(token));    
    }, []);

    const login = async (data) => {
        try {
            const res = await api.post("/auth/login", data);

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            setUser(true);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    const register = async (data) => {
        try {
            await api.post("/auth/register", data);
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.clear();
            setUser(false);
            navigate("/");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
