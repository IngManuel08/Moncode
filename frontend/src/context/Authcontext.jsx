import { createContext, useContext, useState, useEffect, } from "react";
import { register, login, logout, verifyToken } from "../api/auth";
import Cookies from 'js-cookie';



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth debe estar dentro de un AuthProvider");
    return context;
} //fin de useAuth

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN;

    const signUp = async (user) => {
        try {
            const res = await register(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setIsAdmin(false);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    }//fin de signUp

    const singIn = async (user) => {
        try {
            const res = await login(user);
            console.log(res);
            if (res.data.role === ROLE_ADMIN)
                setIsAdmin(true);


            setErrors([]);
            setUser(res.data);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            const data = error.response?.data;
            const mensaje = data?.message || data?.errors?.[0] || "Error al iniciar sesión";
            setErrors([mensaje]);
        }
    }

    useEffect(() => {
        async function chekLogin() {
            const token = Cookies.get('token');
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setIsAdmin(false);
                setIsLoading(false);
                return;
            }
            try {
                const res = await verifyToken(token);

                if (!res.data) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setIsAdmin(false);
                    setIsLoading(false);
                    return;
                }

                // Token valid – restore session
                setUser(res.data);
                setIsAuthenticated(true);
                if (res.data.role === ROLE_ADMIN)
                    setIsAdmin(true);

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        }
        chekLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logOut = () => {
        logout();
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        setIsAdmin(false);
    }



    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            errors,
            signUp,
            singIn,
            isAdmin,
            isLoading,
            logOut


        }}>
            {children}
        </AuthContext.Provider>
    )
};//fin de AuthProvider

