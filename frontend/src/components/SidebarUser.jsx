import { Link, useLocation } from "react-router";
import {
  FiHome,
  FiGrid,
  FiShoppingCart,
  FiHelpCircle,
  FiUser,
  FiBox,
  FiLogOut,
  FiTruck,
  FiEdit2
} from "react-icons/fi";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router";

function Sidebar() {
  const { user, logOut } = useAuth();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const path = location.pathname;
  const navigate = useNavigate();

  const isActive = (path) => path === location.pathname;

  return (
    <div className="
      fixed left-0 top-20 bottom-0 w-32 
      bg-white dark:bg-black 
      rounded-r-3xl flex flex-col items-center py-8 gap-8 overflow-y-auto
      transition-colors duration-300 border-r border-gray-100 dark:border-white/5
    ">
      {/* INICIO */}
      <Link
        to="/"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/") ? "bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10" : "hover:bg-gray-50 dark:hover:bg-[#111111]"
          }`}
      >
        <FiHome size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">INICIO</span>
      </Link>

      {/* CATEGORIA */}
      <Link
        to="/categoria"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/categoria") ? "bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10" : "hover:bg-gray-50 dark:hover:bg-[#111111]"
          }`}
      >
        <FiGrid size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">CATEGORIA</span>
      </Link>

      {/* TU CARRITO */}
      <Link
        to="/carrito"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/carrito") ? "bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10" : "hover:bg-gray-50 dark:hover:bg-[#111111]"
          }`}
      >
        <FiShoppingCart size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">TU CARRITO</span>
      </Link>

      {/* MIS PEDIDOS */}
      <Link
        to="/mis-pedidos"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/mis-pedidos") ? "bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10" : "hover:bg-gray-50 dark:hover:bg-[#111111]"
          }`}
      >
        <FiTruck size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light text-center leading-tight">MIS PEDIDOS</span>
      </Link>

      {/* AYUDA */}
      <Link
        to="/ayuda"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/ayuda") ? "bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10" : "hover:bg-gray-50 dark:hover:bg-[#111111]"
          }`}
      >
        <FiHelpCircle size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">AYUDA</span>
      </Link>

      {/* PERFIL */}
      <Link
        to="/perfilUser"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/perfilUser") ? "bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10" : "hover:bg-gray-50 dark:hover:bg-[#111111]"
          }`}
      >
        <FiEdit2 size={28} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light text-center leading-tight">EDITAR PERFIL</span>
      </Link>

      {/* CERRAR SESIÓN */}
      <button
        onClick={() => {
          logOut();
          navigate("/login");
        }}
        className="flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors hover:bg-gray-50 dark:hover:bg-[#111111]"
      >
        <FiLogOut size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">CERRAR SESIÓN</span>
      </button>
    </div>
  );
}

export default Sidebar;
