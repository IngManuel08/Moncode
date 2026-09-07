import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import { CarritoProvider } from "./context/carritoContext.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
import HomePage from "./pages/home.jsx";
import HelpPage from "./pages/ayuda.jsx";
import Protected_Router from "./protected_Router.jsx";
import InventarioPage from "./pages/inventario.jsx";
import PerfilPage from "./pages/perfil.jsx";
import CarritoPage from "./pages/carritoPage.jsx";
import CategoriaPage from "./pages/categoria.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";
import MisPedidosPage from "./pages/MisPedidosPage.jsx";
import Sidebar from "./components/Sidebar.jsx";
import HeaderGlobal from "./components/HeaderGlobal.jsx";
import BuscarPage from "./pages/BuscarPage.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { ProductProvider } from "./context/producContext.jsx";
import { OrdenProvider } from "./context/ordenContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <CarritoProvider>
              <OrdenProvider>
                <BrowserRouter>
                  <HeaderGlobal />
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/ayuda" element={<HelpPage />} />
                    <Route path="/categoria" element={<CategoriaPage />} />
                    <Route path="/categoria/:category" element={<CategoriaPage />} />
                    <Route path="/buscar/:searchTerm" element={<BuscarPage />} />
                {/* rutas protegidas */}
                    <Route element={<Protected_Router />}>
                      <Route path="/carrito" element={<CarritoPage />} />
                      <Route path="/perfil" element={<PerfilPage />} />
                      <Route path="/perfilUser" element={<PerfilPage />} />
                      <Route path="/inventario" element={<InventarioPage />} />
                      <Route path="/admin/pedidos" element={<AdminOrdersPage />} />
                      <Route path="/mis-pedidos" element={<MisPedidosPage />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </OrdenProvider>
            </CarritoProvider>
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
