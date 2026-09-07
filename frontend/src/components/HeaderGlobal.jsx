import HeaderUser from "./HeaderUser.jsx";
import HeaderAdmin from "./HeaderAdmin.jsx";
import { useLocation } from "react-router";
import { useAuth } from "../context/Authcontext.jsx";
import { useTheme } from "../context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

function HeaderGlobal() {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    // Rutas donde NO queremos mostrar el Header completo (pero sí el Toggle)
    const hiddenHeaderRoutes = ["/login", "/register", "/perfil", "/perfilUser"];
    
    if (hiddenHeaderRoutes.includes(location.pathname)) {
        return (
            <div className="fixed top-4 right-4 z-[100]">
                <ThemeToggleMinimal />
            </div>
        );
    }

    if (isAuthenticated && user?.role === "admin") return <HeaderAdmin />;
    return <HeaderUser />; // Mostrar a usuarios normales o visitantes
}

// Subcomponente para rutas sin header
function ThemeToggleMinimal() {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl text-black dark:text-white hover:scale-110 active:scale-95 transition-all duration-300"
            title={darkMode ? "Modo Claro" : "Modo Oscuro"}
        >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
    );
}

export default HeaderGlobal;
