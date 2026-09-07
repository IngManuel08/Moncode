import { Link, useLocation } from "react-router";
import {
  FiHome,
  FiGrid,
  FiHelpCircle,
  FiUser,
  FiBox,
  FiLogOut,
  FiList
} from "react-icons/fi";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router";

function SidebarAdmin() {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const isActive = (path) => path === location.pathname;

  return (
    <div className="
      fixed left-0 top-20 bottom-0 w-32 
      bg-emerald-50 dark:bg-black 
      rounded-r-3xl flex flex-col items-center py-8 gap-8 overflow-y-auto
      transition-colors duration-300 border-r border-emerald-100 dark:border-emerald-900/20
    ">
      {/* INICIO */}
      <Link
        to="/home"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${
          isActive("/") ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30" : "hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
        }`}
      >
        <FiHome size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">INICIO</span>
      </Link>

      {/* CATEGORIA */}
      <Link
        to="/categoria"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${
          isActive("/categoria") ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30" : "hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
        }`}
      >
        <FiGrid size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">CATEGORIA</span>
      </Link>

      {/*inventario*/}
      <Link
        to="/inventario"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${
          isActive("/inventario") ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30" : "hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
        }`}
      >
        <FiBox size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">INVENTARIO</span>
      </Link>

      {/* PEDIDOS (ADMIN) */}
      <Link
        to="/admin/pedidos"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${
          isActive("/admin/pedidos") ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30" : "hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
        }`}
      >
        <FiList size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">PEDIDOS</span>
      </Link>

      {/* AYUDA */}
      <Link
        to="/ayuda"
        className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${
          isActive("/ayuda") ? "bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/30" : "hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
        }`}
      >
        <FiHelpCircle size={32} className="text-black dark:text-white" />
        <span className="text-black dark:text-white text-xs font-light">AYUDA</span>
      </Link>

    </div>
  );
}

export default SidebarAdmin;
