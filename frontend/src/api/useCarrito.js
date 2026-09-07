import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";

export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error("useCarrito debe ser utilizado dentro de un CarritoProvider");
    }

    return context;
};