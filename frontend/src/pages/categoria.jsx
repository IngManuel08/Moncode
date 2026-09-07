import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
//import { getAllProducts } from "../api/products.js";
import { useProducts } from "../context/producContext.jsx";
import { useCarrito } from "../context/useCarrito.js";
import { useAuth } from "../context/Authcontext.jsx";
import { useParams } from "react-router";
import ProductModal from "../components/ProductModal.jsx";

function CategoriaPage() {
  const categorias = [
    "Todos",
    "Tarjeta Gráfica",
    "Placa Madre",
    "Procesador",
    "Refrigeración",
    "Gabinete",
    "Almacenamiento",
    "RAM",
    "Fuente de poder",
    "Monitor",
    "Mouse / Ratón",
    "Teclado",
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const { products, getProducts } = useProducts();
  const { agregarAlCarrito, mensaje } = useCarrito();
  const [productos, setProductos] = useState([]);
  const { category } = useParams();
  const { user } = useAuth();

  const [search] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);


  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  // dame el query para las categorias
  useEffect(() => {

    let productosFiltrados = products;

    // Filtrar por categoría
    if (categoriaSeleccionada && categoriaSeleccionada !== "Todos") {
      productosFiltrados = productosFiltrados.filter(
        (product) =>
          product.category && product.category.toLowerCase() === categoriaSeleccionada.toLowerCase()
      );
    }

    // Filtrar por búsqueda
    if (search) {
      productosFiltrados = productosFiltrados.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    // Guardar los productos filtrados
    setProductos(productosFiltrados);

  }, [categoriaSeleccionada, products, search]);

  useEffect(() => {
    if (category) {
      setCategoriaSeleccionada(category);
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Sidebar />

      <main className="ml-32 mt-20 p-8">
        {mensaje && (
          <div className="fixed top-24 right-5 z-50 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 rounded shadow-lg animate-bounce">
            <p className="font-bold">¡Éxito!</p>
            <p>{mensaje}</p>
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Categorías</h1>

        {/* BOTONES DE CATEGORÍAS */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-4 py-2 rounded-lg border transition-all shadow-sm
                                ${categoriaSeleccionada === cat
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
                  : "bg-gray-50 dark:bg-[#050505] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
                }
                            `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTADO DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.length === 0 && categoriaSeleccionada && (
            <p className="text-gray-700 dark:text-gray-400">No hay productos en esta categoría.</p>
          )}

          {productos.map((product) => (
            <div key={product._id} className="bg-gray-50 dark:bg-[#050505] p-4 rounded-xl shadow-md transition-colors border border-gray-100 dark:border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded cursor-pointer transition-transform hover:scale-105 shadow-sm"
                onClick={() => setProductoSeleccionado(product)}
              />
              <h3 
                className="text-xl font-bold mt-2 text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setProductoSeleccionado(product)}
              >
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

        {productoSeleccionado && (
            <ProductModal 
                product={productoSeleccionado} 
                onClose={() => setProductoSeleccionado(null)}
                onReviewAdded={() => getProducts()}
            />
        )}
      </main>
    </div>
  );
}

export default CategoriaPage;
