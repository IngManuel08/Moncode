import { useEffect, useState } from "react";
import { useOrdenes } from "../context/ordenContext.jsx";
import { useAuth } from "../context/Authcontext.jsx";

function AdminOrdersPage() {
    const { ordenesAdmin, loading, cargarOrdenes, cambiarEstadoOrden } = useOrdenes();
    const { isAdmin } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            cargarOrdenes();
        }
    }, [isAdmin]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setStatusLoading(true);
            await cambiarEstadoOrden(orderId, newStatus);
            // Update the selected order if it's currently open
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el estado");
        } finally {
            setStatusLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
                <h1 className="text-2xl font-bold text-red-600">No autorizado para ver esta página</h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
                <h1 className="text-2xl font-bold text-gray-700">Cargando pedidos...</h1>
            </div>
        );
    }

    return (
        <div className="ml-32 min-h-screen bg-white dark:bg-black p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#085a00] dark:text-emerald-400 mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-[#085a00] dark:after:bg-emerald-400">
                    Gestión de Pedidos (Admin)
                </h1>

                {ordenesAdmin.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-[#050505] p-8 rounded-2xl shadow-md text-center transition-colors border border-gray-100 dark:border-white/5">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No hay pedidos registrados en el sistema por el momento.</p>
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-[#050505] rounded-2xl shadow-md overflow-hidden transition-colors border border-gray-100 dark:border-white/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#085a00] dark:bg-emerald-900 text-white transition-colors">
                                        <th className="p-4 font-semibold text-sm">ID del Pedido</th>
                                        <th className="p-4 font-semibold text-sm">Usuario</th>
                                        <th className="p-4 font-semibold text-sm">Fecha</th>
                                        <th className="p-4 font-semibold text-sm">Total ($)</th>
                                        <th className="p-4 font-semibold text-sm">Estado</th>
                                        <th className="p-4 font-semibold text-sm text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordenesAdmin.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                                                {order._id.slice(-8)}...
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                                        {order.userId?.username || "Usuario Desconocido"}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {order.userId?.email || "Sin email"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 font-medium text-[#085a00] dark:text-emerald-400">
                                                ${order.total.toFixed(2)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                            order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                                                order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button 
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-[#085a00] dark:text-emerald-400 hover:text-[#0b7a00] dark:hover:text-emerald-300 font-medium text-sm hover:underline transition-all"
                                                >
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Detalles */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-black rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl transition-colors border border-gray-200 dark:border-white/10">
                        <div className="flex justify-between items-center mb-6 border-b dark:border-gray-700 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Detalles del Pedido <span className="text-sm font-mono text-gray-500 dark:text-gray-400 ml-2">#{selectedOrder._id}</span>
                            </h2>
                            <button 
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border dark:border-gray-700 transition-colors">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Cliente</p>
                                <p className="text-gray-800 dark:text-gray-200">{selectedOrder.userId?.username}</p>
                                <p className="text-gray-500 dark:text-gray-400">{selectedOrder.userId?.email}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border dark:border-gray-700 transition-colors">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Información de Fecha</p>
                                <p className="text-gray-800 dark:text-gray-200">Creado: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                <p className="text-gray-500 dark:text-gray-400">Actualizado: {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b dark:border-gray-700 pb-2">Productos</h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg transition-colors">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{item.productId?.name || 'Producto Eliminado'}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Cantidad: {item.quantity} x ${item.price?.toFixed(2)}</p>
                                        </div>
                                        <p className="font-semibold text-[#085a00] dark:text-emerald-400">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Total de la Orden</span>
                                <span className="text-xl font-bold text-[#085a00] dark:text-emerald-400">${selectedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800 mb-4 transition-colors">
                            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Cambiar Estado del Pedido</h3>
                            <div className="flex gap-3 items-center">
                                <select 
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                                    disabled={statusLoading || selectedOrder.status === 'cancelled'}
                                    className="flex-1 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-colors"
                                >
                                    <option value="pending">Pendiente (Pending)</option>
                                    <option value="confirmed">Confirmado (Confirmed)</option>
                                    <option value="shipped">Enviado (Shipped)</option>
                                    <option value="delivered">Entregado (Delivered)</option>
                                    <option value="cancelled">Cancelado (Cancelled)</option>
                                </select>
                                {statusLoading && <span className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">Actualizando...</span>}
                            </div>
                            {selectedOrder.status === 'cancelled' && (
                                <p className="text-xs text-red-500 dark:text-red-400 mt-2">Un pedido cancelado no puede cambiar de estado nuevamente.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminOrdersPage;
