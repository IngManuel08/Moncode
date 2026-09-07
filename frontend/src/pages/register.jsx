import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from "../Schema/RegisterSchema";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';


function Register() {
    const { register, handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const { signUp, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    }
    const togglePasswordVisibilityConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated]);//Fin de useEffect

    const onSubmit = async (values) => {
        console.log(values);
        signUp(values);
    }//Fin de onSubmit

    return (
        <div className="min-h-screen bg-white dark:bg-black flex transition-colors duration-300">
            {/* Lado izquierdo - Imagen de fondo y logo */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img src="/images/image.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />

                {/* Logo MOON CODE */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="w-48 h-48 bg-gray-200/90 dark:bg-[#5a5a5a]/90 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors">
                                <div className="relative">
                                    <div className="text-[120px] font-bold text-gray-400 dark:text-gray-300">C</div>
                                    <div className="absolute top-8 left-8">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                                            <div className="text-4xl">🌙</div>
                                        </div>
                                    </div>
                                </div>
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
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-12 text-center lg:text-right">Registrarse</h2>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        <label className="text-gray-700 dark:text-gray-300">username</label>
                        {/* Campo Usuario */}
                        <div className="relative">
                            <input
                                {...register("username")}
                                type="text"
                                placeholder="username"
                                style={{
                                    border: errors.username ? '1px solid red' : '1px solid #d1d5db',
                                }}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-colors border border-gray-200 dark:border-white/10"
                            />
                            {
                                errors.username && (
                                    <p className="text-red-500 mt-1">{errors.username.message}</p>
                                )
                            }
                        </div>

                        {/* Campo Email */}
                        <label className="text-gray-700 dark:text-gray-300">Email</label>
                        <div className="relative">
                            <input
                                {...register("email")}
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
                                {...register("password")}
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

                        {/* Campo Repetir Contraseña */}
                        <label className="text-gray-700 dark:text-gray-300">Confirm Password</label>
                        <div className="relative">
                            <input
                                {...register("confirm")}
                                type={showPasswordConfirm ? "text" : "password"}
                                placeholder="Repita la contraseña"
                                style={{
                                    border: errors.confirm ? '1px solid red' : '1px solid #d1d5db',
                                }}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-colors border border-gray-200 dark:border-white/10"
                            />

                            {
                                showPasswordConfirm ? <IoEyeSharp size={30} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={togglePasswordVisibilityConfirm} /> :
                                    <IoEyeOffSharp size={30} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                        onClick={togglePasswordVisibilityConfirm} />
                            }
                            {
                                errors.confirm && (
                                    <span className="text-red-500 mt-1">{errors.confirm.message}</span>
                                )
                            }
                        </div>

                        {/* Botón Registrarse */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="px-12 py-3 bg-[#8b7355] text-white rounded-full hover:bg-[#7a6449] transition-colors font-medium shadow-md"
                            >
                                Registrate
                            </button>
                        </div>
                    </form>

                    {/* Link Iniciar Sesión */}
                    <div className="text-center mt-8">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">¿Ya tienes una cuenta? </span>
                        <Link to="/login" className="text-[#4ade80] hover:text-[#3bc970] text-sm font-medium inline-flex items-center gap-1">
                            INICIAR SESIÓN
                            <IoLogIn size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register