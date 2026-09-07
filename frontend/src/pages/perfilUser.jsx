import { useCarrito } from "../context/carritoContext";
import Ticket from "../components/ticket.jsx";

export default function PerfilUser() {
    const { tiketCompra } = useCarrito();

    return (
        <div className="p-6 bg-white dark:bg-black rounded-2xl shadow-lg transition-colors">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Perfil del Usuario</h1>

            {tiketCompra ? (
                <Ticket ticket={tiketCompra} />
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    No tienes compras recientes.
                </p>
            )}
        </div>
    );
}
