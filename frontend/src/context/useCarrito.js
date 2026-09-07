import { useContext } from "react";
import { CarritoContext } from "./carritoContext";

export const useCarrito = () => {
    return useContext(CarritoContext);
};