import Sidebar from "../components/SidebarUser.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext.jsx";
import { useCarrito } from "../context/useCarrito.js";
import Ticket from "../components/ticket.jsx";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm.jsx';
import { createPaymentIntent } from '../api/payment.js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51MockupKeyForTestingOnlyPLEASECHANGE");

function CarritoPage() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const {
    cart, // Extraemos cart directamente
    calcularTotal,
    actualizarCantidad,
    confirmarOrden,
    mensaje,
    setMensaje,
    cancelarOrden,
    eliminarProducto,
    tiketCompra,
  } = useCarrito();

  const [mostarTicket, setMostrarTicket] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);

  //function para actualizar la cantidad de productos en el carrito
  /* const incrementarCantidad = (product) => {
    const productoExistente = cart.find(
      (cartitem) => cartitem._id === product._id
    );
    if (productoExistente.toShell >= productoExistente.quantity) {
      toast.warn(
        "has alcanzado la cantidad maxima" +
          productoExistente.quantity +
          "para este producto"
      );
      return;
    } else {
      incProduct(product._id);
      toast.success("cantidad actualizada");
    }*/
  //funcion para mostrar los productos que se adregregaron al carrito

  //funcion para iniciar el pago
  const handleIniciarPago = async () => {
    try {
      const total = calcularTotal();
      if (total <= 0) {
        setMensaje("El carrito está vacío");
        return;
      }
      
      // Simulador Frontend Puro: No pedimos clientSecret a Stripe
      setMostrarPago(true);
    } catch (error) {
      console.error("Error al iniciar pago", error);
      setMensaje("Error al conectar con el servidor simulado.");
    }
  };

  //funcion para confirmar la orden por parte del usuario (Despues del pago)
  const handleConfirmarOrden = async () => {
    const ticket = await confirmarOrden();

    if (ticket) {
      setMostrarPago(false);
      setMostrarTicket(true);
    }

    //setMensajeConfirmado("Orden confirmada exitosamente.");
    //setProductosDetalles([]);
  }; //fin handleConfirmarOrden

  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => {
      setMensaje("");
    }, 4000); // 4 segundos

    return () => clearTimeout(timer);
  }, [mensaje]);

  //funcion para mostrar el ticket
  useEffect(() => {
    if (tiketCompra) {
      console.log("Ticket de compra:", tiketCompra);
    }
  }, [tiketCompra]);

  //funcion para cancelar la orden por parte del usuario
  const handleCancelarOrden = () => {
    cancelarOrden();
  }; //finhandleCancelarOrden

  //funcion para elminiar el producto del carrito
  const handleEliminarProducto = (id) => {
    console.log("Producto eliminado:", id);
    eliminarProducto(id);
  };

  //
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Sidebar />

      {/* Main content - offset for sidebar */}
      <main className="ml-32 pt-24 px-8 pb-8">
        <div className="bg-gray-50 dark:bg-[#050505] rounded-3xl p-8 min-h-[calc(100vh-8rem)] shadow-lg transition-colors border border-gray-100 dark:border-white/5">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Tu carrito</h2>
          {mensaje && (
            <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg">
              {mensaje}
            </div>
          )}

          {cart.length === 0 ? (
            <p className="text-center py-8 text-gray-600 dark:text-gray-400">
              No hay productos en el carrito
            </p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-xl shadow-inner bg-white dark:bg-black p-1">
                <table className="w-full bg-white dark:bg-[#050505] rounded-lg overflow-hidden transition-colors">
                  <thead className="bg-gray-100 dark:bg-gray-800 transition-colors">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Descripción
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Cantidad
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Subtotal
                      </th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((producto) => (
                      <tr
                        key={producto._id}
                        className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white rounded-lg px-4 py-2 inline-block transition-colors border border-gray-100 dark:border-white/5">
                            {producto.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {producto.description}
                        </td>
                        <td className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-6 py-4 font-semibold transition-colors">
                          ${producto.price}
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                          <input
                            type="number"
                            min="1"
                            value={producto.cantidad}
                            onChange={(e) =>
                              actualizarCantidad(
                                producto._id,
                                Number(e.target.value)
                              )
                            }
                            className="w-20 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md text-center transition-colors shadow-sm"
                          />
                        </td>
                        <td className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-6 py-4 font-semibold transition-colors">
                          ${producto.price * producto.cantidad}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEliminarProducto(producto._id)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-end items-center gap-6">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  Total: ${calcularTotal()}
                </div>
                <button
                  onClick={handleIniciarPago}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={handleCancelarOrden}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Cancelar Orden
                </button>

              </div>


            </>
          )}
        </div>
      </main>
      {tiketCompra && (
        <button
          onClick={() => setMostrarTicket(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors fixed bottom-4 right-4 z-50"
        >
          Ver Ticket
        </button>

      )}

      {mostarTicket && tiketCompra && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <Ticket
              ticket={tiketCompra}
              onClose={() => setMostrarTicket(false)}
            />
          </div>
        </div>
      )}

      {mostrarPago && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Pago</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
              Estás en entorno local. Haz click para simular un pago exitoso.
            </p>
            
            <div className="w-full text-center mb-6 p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-3xl font-bold text-gray-900 dark:text-white">
              ${calcularTotal()}
            </div>

            <button
              onClick={async (e) => {
                e.preventDefault();
                const btn = e.currentTarget;
                btn.disabled = true;
                btn.innerHTML = "Procesando...";
                
                try {
                  // Simular un delay de carga para que parezca real
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  await handleConfirmarOrden();
                } catch (error) {
                  console.error("Error al procesar el pago:", error);
                  // Restaurar el botón si hay un error
                  btn.disabled = false;
                  btn.innerHTML = "Pagar Orden Ahora";
                  setMensaje("Error al procesar el pago. Intente nuevamente.");
                  setMostrarPago(false);
                }
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-95 mb-3"
            >
              Pagar Orden Ahora
            </button>

            <button
              onClick={() => setMostrarPago(false)}
              className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-medium py-3 rounded-xl transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CarritoPage;
