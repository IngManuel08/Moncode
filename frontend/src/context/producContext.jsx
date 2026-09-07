import { getAllProducts } from "../api/products";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}; //fin de useProducts

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);


  // funcion para obtener todos los productos
  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,

      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
