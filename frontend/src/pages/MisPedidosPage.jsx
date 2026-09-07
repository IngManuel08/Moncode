import { useEffect, useState } from "react";
import { useOrdenes } from "../context/ordenContext.jsx";
import { useAuth } from "../context/Authcontext.jsx";
import SidebarUser from "../components/SidebarUser.jsx";
import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiXCircle } from "react-icons/fi";

function MisPedidosPage() {
    const { ordenesUser, loading, cargarOrdenesUser } = useOrdenes();
    const { isAuthenticated } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            cargarOrdenesUser();
        }
    }, [isAuthenticated]);

    const getStatusStep = (status) => {
        switch (status) {
            case 'pending': return 1;
            case 'confirmed': return 2;
            case 'shipped': return 3;
            case 'delivered': return 4;
            case 'cancelled': return -1;
            default: return 0;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black">
                <SidebarUser />
                <div className="ml-32 pt-24 px-8 pb-8 flex justify-center items-center h-[calc(100vh-6rem)]">
                    <h1 className="text-2xl font-bold text-gray-700">Cargando tus pedidos...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <SidebarUser />

            <main className="ml-32 pt-24 px-8 pb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#085a00] dark:text-emerald-400 mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-[#085a00] dark:after:bg-emerald-400">
                        Mis Pedidos
                    </h1>

                    {ordenesUser.length === 0 ? (
                        <div className="bg-gray-50 dark:bg-[#050505] p-8 rounded-2xl shadow-sm text-center transition-colors border border-gray-100 dark:border-white/5">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">Aún no has realizado ningún pedido.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Lista de Pedidos */}
                            <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar">
                                {ordenesUser.map((order) => (
                                    <div 
                                        key={order._id} 
                                        onClick={() => setSelectedOrder(order)}
                                        className={`bg-gray-50 dark:bg-[#050505] p-5 rounded-2xl shadow-sm cursor-pointer transition-all border-2 ${selectedOrder?._id === order._id ? 'border-[#085a00] dark:border-emerald-500' : 'border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-mono text-sm text-gray-500 dark:text-gray-400">#{order._id.slice(-8)}</span>
                                            <span className="font-bold text-[#085a00] dark:text-emerald-400">${order.total.toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                                order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{order.items.length} producto(s)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Detalles de Seguimiento */}
                            <div className="lg:col-span-2">
                                {selectedOrder ? (
                                    <div className="bg-gray-50 dark:bg-[#050505] p-8 rounded-2xl shadow-sm transition-colors border border-gray-100 dark:border-white/5">
                                        <div className="flex justify-between items-center mb-8 border-b dark:border-gray-700 pb-4">
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Detalle del Pedido</h2>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">ID: {selectedOrder._id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Total pagado</p>
                                                <p className="text-2xl font-bold text-[#085a00] dark:text-emerald-400">${selectedOrder.total.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        {/* Timeline de Seguimiento */}
                                        <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl transition-colors border dark:border-gray-700">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Seguimiento del Envío</h3>
                                            
                                            {selectedOrder.status === 'cancelled' ? (
                                                <div className="flex items-center justify-center py-6 text-red-500 dark:text-red-400 gap-3">
                                                    <FiXCircle size={32} />
                                                    <span className="text-xl font-bold">Pedido Cancelado</span>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    {/* Línea de fondo */}
                                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
                                                    
                                                    {/* Línea de progreso */}
                                                    <div 
                                                        className="absolute top-1/2 left-0 h-1 bg-[#085a00] dark:bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
                                                        style={{ width: `${((getStatusStep(selectedOrder.status) - 1) / 3) * 100}%` }}
                                                    ></div>

                                                    {/* Pasos */}
                                                    <div className="relative z-10 flex justify-between">
                                                        {[
                                                            { step: 1, label: 'Pendiente', icon: FiCheckCircle },
                                                            { step: 2, label: 'Confirmado', icon: FiPackage },
                                                            { step: 3, label: 'Enviado', icon: FiTruck },
                                                            { step: 4, label: 'Entregado', icon: FiHome }
                                                        ].map((item) => {
                                                            const currentStep = getStatusStep(selectedOrder.status);
                                                            const isCompleted = currentStep >= item.step;
                                                            const isCurrent = currentStep === item.step;
                                                            
                                                            return (
                                                                <div key={item.step} className="flex flex-col items-center">
                                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300
                                                                        ${isCompleted ? 'bg-[#085a00] dark:bg-emerald-500 border-[#085a00] dark:border-emerald-500 text-white' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'}
                                                                        ${isCurrent ? 'ring-4 ring-[#085a00]/30 dark:ring-emerald-500/30 grow' : ''}
                                                                    `}>
                                                                        <item.icon size={20} />
                                                                    </div>
                                                                    <span className={`mt-3 text-xs md:text-sm font-medium ${isCompleted ? 'text-[#085a00] dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                                        {item.label}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Lista de Productos */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Productos en este pedido</h3>
                                            <div className="space-y-4">
                                                {selectedOrder.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-colors">
                                                                IMG
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-800 dark:text-gray-200">{item.productId?.name || 'Producto Eliminado'}</p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">Cantidad: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-bold text-gray-800 dark:text-gray-200">${(item.quantity * item.price).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 dark:bg-[#050505] p-8 rounded-2xl shadow-sm h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 min-h-[400px] transition-colors border border-gray-100 dark:border-white/5">
                                        <FiPackage size={64} className="mb-4 text-gray-200 dark:text-gray-700" />
                                        <p className="text-lg">Selecciona un pedido de la lista para ver su seguimiento</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MisPedidosPage;
