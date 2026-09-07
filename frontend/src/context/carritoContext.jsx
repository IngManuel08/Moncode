import { createContext, useState, useEffect, useContext } from "react";
import {
  createOrder,
  eliminarOrden,
} from "../api/carrito.js";

// eslint-disable-next-line react-refresh/only-export-components
export const CarritoContext = createContext();


export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tiketCompra, setTiketCompra] = useState(null);
  






  //funcion para eliminar un producto del carrito
  const eliminarProducto = (idItem) => {
    setCart((prevCarrito) =>
      prevCarrito.filter((product) => product._id !== idItem)
    );
  };

  //limpiar carrito
  const limpiarCarrito = () => {
    setCart([]);
  };

  const incProduct = (idItem) => {
    setCart((prevCarrito) =>
      prevCarrito.map((cartItem) =>
        cartItem._id === idItem
          ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
          : cartItem
      )
    );
  }; //fin incProduct

  const decProduct = (idItem) => {
    setCart((prevCarrito) =>
      prevCarrito.map((cartItem) =>
        cartItem._id === idItem && cartItem.cantidad > 1
          ? { ...cartItem, cantidad: cartItem.cantidad - 1 }
          : cartItem
      )
    );
  }; //fin decProduct

  const actualizarCantidad = (idItem, nuevaCantidad) => {
    setCart((prevCarrito) =>
      prevCarrito.map((product) =>
        product._id === idItem
          ? { ...product, cantidad: nuevaCantidad }
          : product
      )
    );
  };

  const agregarAlCarrito = (product) => {
    const productoExistente = cart.find(item => item._id === product._id);
    if (productoExistente) {
        setCart(cart.map(item => item._id === product._id ? { ...item, cantidad: item.cantidad + 1 } : item));
        setMensaje("Se agregó una unidad más al carrito.");
    } else {
        setCart([...cart, { ...product, cantidad: 1 }]);
        setMensaje("Se agregó correctamente al carrito.");
    }
  }; //fin agregarAlCarrito



  //funcion para mostrar los productos que se adregregaron al carrito
  const mostrarProductosCarrito = () => {
    return cart.map((item) => item);
  };

  //funcion para calcular el total del carrito
  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.cantidad, 0);
  }; //fin calcularTotal

  //funcion para confirmar la orden por el id
  const confirmarOrden = async () => {
    if (cart.length === 0) return;

    const productosInvalidos = cart.some((item) => item.cantidad <= 0);
    if (productosInvalidos) {
      setMensaje("Hay productos con cantidad 0 porfavor cheque el carrito.");
      return;
    }

    const orden = {

      items: cart.map((item) => ({
        productId: item._id,
        price: item.price,
        quantity: item.cantidad,
      })),
      total: calcularTotal(),
    };
    try {
      console.log("Orden confirmada:", orden);
      const response = await createOrder(orden);

      setTiketCompra(response.data.order);
      localStorage.setItem("ticketCompra", JSON.stringify(response.data.order));
      console.log("Ticket de compra:", response.data);

      setMensaje("Orden confirmada exitosamente.");
      setCart([]);
      return response.data;
    } catch (error) {
      console.error("Error al confirmar la orden:", error);
      setMensaje("Error al confirmar la orden. Por favor, intente nuevamente.");
    }
  }; //fin confirmarOrden

  //funcion para cancelar la orden por parte del usuario (limpia el carrito localmente)
  const cancelarOrden = () => {
    if (cart.length === 0) return;
    setMensaje("Carrito vaciado.");
    setCart([]);
  }; //fin cancelarOrden

  // funcion para generar un tiket de la compra

  {
    /*decProduct, incProduct,*/
  }

  useEffect(() => {
    const ticketGuardado = localStorage.getItem("ticketCompra");
    if (ticketGuardado) {
      setTiketCompra(JSON.parse(ticketGuardado));
    }
  }, []);



  return (
    <CarritoContext.Provider
      value={{
        decProduct,
        incProduct,
        eliminarProducto,
        limpiarCarrito,
        actualizarCantidad,
        agregarAlCarrito,
        cart,
        setCart,
        mostrarProductosCarrito,
        calcularTotal,
        confirmarOrden,
        cancelarOrden,
        mensaje,
        setMensaje,
        tiketCompra,
        setTiketCompra,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
