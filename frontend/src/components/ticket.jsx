export default function Ticket({ ticket, onClose }) {

  if (!ticket) return null;

  const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

  const formatDate = (date) => {
    if (!date) return "Ahora";
    return new Date(date).toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-10 bg-white dark:bg-black shadow-2xl rounded-2xl p-8 w-full max-w-xl mx-auto border border-gray-100 dark:border-white/10 relative transition-all">

      {/* Botón de cerrar */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 text-2xl font-bold transition-colors"
        >
          ✕
        </button>
      )}

      {/* Encabezado bonito */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 drop-shadow-sm">🧾</div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">Ticket de Compra</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">Gracias por confiar en MONCODE</p>
      </div>

      {/* Caja de información */}
      <div className="mb-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-inner transition-colors">
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
          <strong className="text-gray-800 dark:text-gray-200">ID Orden:</strong>{" "}
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">{ticket._id}</span>
        </p>

        {/* Fecha si existe */}
        {ticket.createdAt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 flex justify-between">
            <strong className="text-gray-800 dark:text-gray-200">Fecha:</strong>{" "}
            <span className="font-medium">{formatDate(ticket.createdAt)}</span>
          </p>
        )}
      </div>

      {/* Productos */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
        Artículos adquiridos
      </h3>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {ticket.items?.length > 0 ? (
          ticket.items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#050505] shadow-sm rounded-2xl p-5 transition-all hover:scale-[1.02] duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                      Ítem {index + 1}
                    </span>
                    <p className="font-bold text-gray-900 dark:text-white transition-colors">
                      Producto {item.productId}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong className="text-gray-700 dark:text-gray-300">Cant:</strong>{" "}
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-bold">
                        x{item.quantity}
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong className="text-gray-700 dark:text-gray-300">P. Unit:</strong> {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Subtotal</p>
                  <p className="text-xl font-black text-green-600 dark:text-green-400 transition-colors">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8 italic bg-gray-50 dark:bg-gray-800/30 rounded-2xl border-2 border-dashed dark:border-gray-700">
            No hay productos en esta orden
          </p>
        )}
      </div>

      {/* Total */}
      <div className="mt-8 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800/50 p-6 rounded-2xl shadow-inner relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 rotate-12 group-hover:scale-110 transition-transform">💰</div>
        <div className="flex justify-between items-center relative z-10">
          <h3 className="text-xl font-black text-gray-700 dark:text-green-100 uppercase tracking-tighter">Total de Compra:</h3>
          <h3 className="text-4xl font-black text-green-700 dark:text-green-400 drop-shadow-sm">
            {formatPrice(ticket.total)}
          </h3>
        </div>
      </div>

      {/* Botón OK */}
      {onClose && (
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:shadow-green-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <span className="text-2xl">✔</span> ENTENDIDO
          </button>
        </div>
      )}
    </div>
  );
}
