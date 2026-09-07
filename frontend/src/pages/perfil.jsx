import { useUser } from "../context/useUser";
import { useAuth } from "../context/Authcontext";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

const Perfil = () => {
  const { user, updateUser } = useUser();
  const { logOut } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(formData);

      if (!formData.username || !formData.email || !formData.password) {
        setMessage("Por favor, completa todos los campos");
        return;
      }

      setMessage("Perfil actualizado con éxito, se cerrará sesión para aplicar cambios.");


      setTimeout(() => {
        logOut();
        navigate("/login", {
          replace: true,
          state: { message: "Perfil actualizado, por favor inicia sesión nuevamente." }
        });
      }, 2000);


    } catch (error) {
      const errorMsg = error.response?.data?.message;

      if (errorMsg) {
        setMessage(errorMsg);
        return;
      }

      setMessage("Error al actualizar perfil");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4 transition-colors duration-300">

      <div className="w-full max-w-md">

        {/* TARJETA */}
        <div className="bg-white dark:bg-white/10 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden transition-colors">

          {/* HEADER */}
          <div className="flex flex-col items-center pt-10 pb-6 bg-gray-50 dark:bg-transparent border-b border-gray-100 dark:border-none">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-2xl bg-[#8b7355] dark:bg-white/10 flex items-center justify-center shadow-lg mb-3">
              <User className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
              {user?.username}
            </h2>

            <p className="text-gray-500 dark:text-slate-400 text-sm transition-colors">
              Edita tu información
            </p>

          </div>

          <div className="px-8 pb-8 pt-6">

            {message && (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm mb-6 text-center shadow-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* USERNAME */}
              <div>
                <label className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                  Usuario
                </label>

                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Tu usuario"
                    className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                  Email
                </label>

                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@email.com"
                    className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                  Nueva contraseña
                </label>

                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nueva contraseña"
                    className="w-full bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition"
                  />

                  {/* Botón ver/ocultar contraseña */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-white transition"
                    title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* BOTON */}
              <button
                type="submit"
                className="w-full mt-4 bg-[#8b7355] hover:bg-[#7a6449] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Actualizar perfil
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;