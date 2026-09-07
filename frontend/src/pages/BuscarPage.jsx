import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProducts } from "../context/producContext.jsx";
import { useCarrito } from "../context/useCarrito.js";
import { useAuth } from "../context/Authcontext.jsx";

function BuscarPage() {
  const { searchTerm } = useParams();
  const { products, getProducts } = useProducts();
  const { agregarAlCarrito, mensaje } = useCarrito();
  const [productos, setProductos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (searchTerm && products) {
      const term = searchTerm.toLowerCase().trim();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
      setProductos(filtered);
    } else {
      setProductos([]);
    }
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <main className="ml-32 mt-20 p-8">
        {mensaje && (
          <div className="fixed top-24 right-5 z-50 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 rounded shadow-lg animate-bounce">
            <p className="font-bold">¡Éxito!</p>
            <p>{mensaje}</p>
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Resultados de búsqueda: "{searchTerm}"</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.length === 0 && (
            <p className="text-gray-700 dark:text-gray-400">No se encontraron productos.</p>
          )}

          {productos.map((product) => (
            <div key={product._id} className="bg-gray-50 dark:bg-[#050505] p-4 rounded-xl shadow-md transition-colors border border-gray-100 dark:border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded shadow-sm"
              />
              <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{product.description}</p>
              <p className="font-semibold text-gray-950 dark:text-gray-100 mt-2">${product.price}</p>

              {user && user.role !== "admin" && (
                <button
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm active:scale-95"
                  onClick={() => agregarAlCarrito(product)}
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BuscarPage;
