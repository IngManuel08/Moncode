import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../Schema/LoginSchema';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { useLocation } from "react-router";


function Login() {
    const { register, handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const { singIn, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const mensaje = location.state?.message || "";

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    }


    useEffect(() => {

        if (isAuthenticated) {
            console.log("Sesion iniciada: ", isAuthenticated);
            navigate("/home");
        }
    }, [isAuthenticated]);//Fin de useEffect

    const onSubmit = async (values) => {
        console.log(values);
        singIn(values);
    }//Fin de onSubmit

    return (
        <div className="min-h-screen bg-white dark:bg-black flex transition-colors duration-300">
            {/* Lado izquierdo - Imagen de fondo y logo */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img src="./assets/" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-200 dark:bg-[#050505] transition-colors" />
                {/* Logo MOON CODE */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="mb-4 flex justify-center">
                                <video
                                    src="/logo.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-48 h-48 object-cover rounded-lg"
                                ></video>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-wide">
                            MOON <span className="font-light">CODE</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Lado derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-black transition-colors">
                {mensaje && (
                    <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full shadow-md w-fit mx-auto mb-6">
                        {mensaje}
                    </div>
                )}
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-12 text-center lg:text-center">Iniciar Sesión </h2>
                    {loginErrors.length > 0 && (
                        loginErrors.map((error, i) => (
                            <div key={i} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-md w-fit mx-auto">
                                <span className="text-lg"><IoPersonAdd /></span>
                                <span className="font-semibold text-sm">{error} </span>
                            </div>
                        ))
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        <label className="text-gray-700 dark:text-gray-300">Email</label>
                        {/* Campo Email */}
                        <div className="relative">
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="email"
                                style={{
                                    border: errors.email ? '1px solid red' : '1px solid #d1d5db',
                                }}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-colors border border-gray-200 dark:border-white/10"
                            />
                            {
                                errors.email && (
                                    <p className="text-red-500 mt-1">{errors.email.message}</p>
                                )

                            }

                        </div>
                        {/* Campo Contraseña */}
                        <label className="text-gray-700 dark:text-gray-300">Password</label>
                        <div className="relative">

                            <input
                                {...register("password", { required: true })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                style={{
                                    border: errors.password ? '1px solid red' : '1px solid #d1d5db',
                                }}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-colors border border-gray-200 dark:border-white/10"
                            />
                            {

                                showPassword ? <IoEyeSharp size={30} className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                    onClick={togglePasswordVisibility} /> :
                                    <IoEyeOffSharp size={30} className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                        onClick={togglePasswordVisibility} />
                            }
                            {
                                errors.password && (
                                    <span className="text-red-500 mt-1">{errors.password.message}</span>
                                )
                            }
                        </div>
                        {/* Botón Registrarse */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="px-12 py-3 bg-[#8b7355] text-white rounded-full hover:bg-[#7a6449] transition-colors font-medium shadow-md"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>

                    {/* Link Iniciar Sesión */}
                    <div className="text-center mt-8">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                            ¿No tienes una cuenta? </span>
                        <Link to="/register" className="text-[#4ade80] hover:text-[#3bc970] text-sm font-medium inline-flex items-center gap-1">
                            Registrarse
                            <IoLogIn size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;