import { createContext, useState } from "react";
import { updateProfileRequest } from "../api/user";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const res = await updateProfileRequest(data, token);
            setUser(res.data.user);
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw error;
        }
    };

    //funcion para cerrar sesión después de actualizar el perfil, para que se apliquen los cambios al iniciar sesión nuevamente
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};