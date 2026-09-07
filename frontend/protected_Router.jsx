import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/Authcontext";


const Protected_Router = () => {
    const { loading, isAuthenticated } = useAuth();
    console.log("Loading: " + loading);
    console.log("IsAuthenticated: " + isAuthenticated);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

    return <Outlet />

};

export default Protected_Router;