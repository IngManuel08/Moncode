import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/Authcontext";


const Protected_Router = () => {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <h1>Cargando...</h1>;
    }

    if (!isAuthenticated && !isLoading) return <Navigate to="/login" replace />;

    return <Outlet />

};

export default Protected_Router;