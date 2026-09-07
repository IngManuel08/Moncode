"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("darkMode") === "true";
        }
        return false;
    });

    // Aplicar la clase al <html>
    useEffect(() => {
        const html = document.documentElement;

        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }

        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
