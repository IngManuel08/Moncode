import { useState } from "react";
import { FiMoon, FiSun, FiSearch, FiUser } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router";

function Header() {
    const { darkMode, setDarkMode } = useTheme();
    const { isAuthenticated, user, logOut } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="
            fixed top-0 left-0 right-0 h-20 
            bg-white dark:bg-black
            flex items-center justify-between px-4 md:px-8 z-50
            transition-colors duration-300 border-b border-gray-100 dark:border-white/5
        ">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain transition-all hover:scale-110"
                />

                <span className="text-black dark:text-white text-lg md:text-xl font-light">
                    MOON <span className="font-normal">CODE</span>
                </span>
            </div>

            {/* Buscador */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Busca aquí"
                        className="
                            w-full px-6 py-3 
                            bg-gray-100 dark:bg-[#050505] 
                            text-black dark:text-white 
                            placeholder-gray-500 dark:placeholder-gray-300
                            rounded-full focus:outline-none focus:ring-2 
                            focus:ring-gray-400 dark:focus:ring-gray-600
                            transition-colors duration-300 border border-gray-100 dark:border-white/10
                        "
                    />
                    <FiSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" size={20} />
                </div>
            </div>

            {/* Botón Modo Oscuro e Ícono Usuario */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-black dark:text-white hover:opacity-70 transition p-2 rounded-full"
                    title={darkMode ? "Modo Claro" : "Modo Oscuro"}
                >
                    {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                </button>

                {/* Usuario Admin Dropdown */}
                {isAuthenticated && user && (
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors px-3 py-2 rounded-full"
                            title={user.username}
                        >
                            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                                <FiUser size={16} className="text-white dark:text-black" />
                            </div>
                            <span className="text-black dark:text-white text-sm font-medium hidden md:block">
                                {user.username}
                            </span>
                        </button>

                        {/* Dropdown menú */}
                        {showUserMenu && (
                            <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                                <button
                                    onClick={() => { setShowUserMenu(false); navigate("/perfil"); }}
                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    Mi perfil
                                </button>
                                <div className="border-t border-gray-100 dark:border-white/10" />
                                <button
                                    onClick={() => { setShowUserMenu(false); logOut(); navigate("/login"); }}
                                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
