import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export default function Ayuda() {
    const items = [
        {
            title: "Tarjeta Gráfica",
            content: (
                <div className="space-y-2">
                    <p>
                        También llamada tarjeta de video o GPU dedicada, es una tarjeta de expansión
                        que contiene una unidad de procesamiento gráfico (GPU).
                    </p>
                    <p>
                        Tipos: Integradas y dedicadas. Curiosidad: las GPUs modernas también se usan
                        para IA y minería.
                    </p>

                    <img
                        src="https://i.imgur.com/tGPU0gO.jpeg"
                        alt="Tarjeta gráfica"
                        className="rounded-lg shadow-md w-full max-w-md"
                    />

                    <video controls className="rounded-lg shadow-md w-full max-w-md">
                        <source src="/videos/gpu.mp4" type="video/mp4" />
                    </video>
                </div>
            )
        },
        {
            title: "Placa Madre",
            content: (
                <div className="space-y-2">
                    <p>
                        Es el circuito principal donde se conectan todos los componentes. Define compatibilidad de procesadores (sockets), memoria RAM y tarjetas gráficas.
                    </p>
                    <p>
                        Tipos: ATX, micro-ATX, mini-ITX. Instalación: se fija al gabinete con tornillos y separadores. Curiosidad: algunas placas incluyen iluminación RGB y
                        Wi-Fi integrado.
                    </p>
                </div>
            )
        },
        {
            title: "Procesador",
            content: (
                <div className="space-y-2">
                    <p>
                        Es la unidad central de procesamiento (CPU), responsable de ejecutar instrucciones. Se instala en el socket de la placa madre con pasta térmica y
                        disipador.
                    </p>
                    <p>
                        Tipos: Intel (Core i3, i5, i7, i9) y AMD (Ryzen 3, 5, 7, 9). Curiosidad: los procesadores modernos tienen miles de millones de transistores.
                    </p>
                </div>
            )
        },
        {
            title: "Refrigeración",
            content: (
                <div className="space-y-2">
                    <p>
                        Mantiene la temperatura adecuada de los componentes. Puede ser por aire (ventiladores) o líquida (radiadores y bombas).
                    </p>
                    <p>
                        Instalación: se coloca sobre CPU/GPU con pasta térmica. Curiosidad: algunos sistemas usan nitrógeno líquido para récords de overclocking.
                    </p>
                    <p>
                        Curiosidad: algunos sistemas usan nitrógeno líquido para récords de overclocking.
                    </p>
                </div>
            )
        },
        {
            title: "Gabinete",
            content: (
                <div className="space-y-2">
                    <p>
                        Caja que alberga los componentes. Define flujo de aire, estética y compatibilidad con placas madre.
                    </p>
                    <p>
                        Tipos: torre completa, media torre, mini torre. Curiosidad: algunos gabinetes tienen paneles de vidrio templado para mostrar el interior.
                    </p>
                </div>
            )
        },
        {
            title: "Almacenamiento",
            content: (
                <div className="space-y-2">
                    <p>
                        Dispositivos donde se guardan datos. HDD (mecánicos), SSD (rápidos) y NVMe (ultra rápidos).
                    </p>
                    <p>
                        Instalación: se conectan por SATA o M.2. Curiosidad: un SSD puede reducir el tiempo de arranque de minutos a segundos.
                    </p>
                </div>
            )
        },
        {
            title: "Memoria RAM",
            content: (
                <div className="space-y-2">
                    <p>
                        Memoria volátil que almacena datos temporales para el procesador. Se instala en ranuras DIMM de la placa madre.
                    </p>
                    <p>
                        Tipos: DDR3, DDR4, DDR5. Curiosidad: más RAM no siempre significa más velocidad, depende de la frecuencia y latencia.
                    </p>
                </div>
            )
        },
        {
            title: "Fuente de poder",
            content: (
                <div className="space-y-2">
                    <p>
                        Suministra energía a todos los componentes. Se mide en watts y debe tener certificaciones (80 Plus).
                    </p>
                    <p>
                        Instalación: se fija al gabinete y conecta a placa madre, GPU y discos. Curiosidad: las fuentes modulares permiten conectar solo los cables necesarios.
                    </p>
                </div>
            )
        },
        {
            title: "Monitor",
            content: (
                <div className="space-y-2">
                    <p>
                        Dispositivo de salida visual. Se conecta por HDMI, DisplayPort o USB-C.
                    </p>
                    <p>
                        Tipos: IPS, TN, VA. Curiosidad: los monitores gaming alcanzan 360 Hz de refresco para máxima fluidez.
                    </p>
                </div>
            )
        },
        {
            title: "Mouse / Ratón",
            content: (
                <div className="space-y-2">
                    <p>
                        Dispositivo de entrada para controlar el cursor. Puede ser óptico o láser.
                    </p>
                    <p>
                        Tipos: ergonómicos, gaming, inalámbricos. Curiosidad: el primer mouse fue inventado en 1964 por Douglas Engelbart.
                    </p>
                </div>
            )
        },
        {
            title: "Teclado",
            content: (
                <div className="space-y-2">
                    <p>
                        Dispositivo de entrada para escribir. Puede ser mecánico o de membrana.
                    </p>
                    <p>
                        Tipos de switches: lineales, táctiles, clicky. Curiosidad: el teclado QWERTY fue diseñado para evitar que las teclas se atascaran en las máquinas de escribir.
                    </p>
                </div>
            )
        }

        // ... resto de items sin cambios
    ];

    const [openIndex, setOpenIndex] = useState(null);
    const toggleItem = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
            <Sidebar />

            <main className="ml-32 mt-20 p-8">

                {/* Desplegables */}
                <div className="border-b-2 border-gray-300 dark:border-gray-600 pb-6 mb-6">
                    {items.map((item, index) => (
                        <div key={index} className="mb-4">

                            {/* Botón */}
                            <button
                                onClick={() => toggleItem(index)}
                                className="
                                w-full flex justify-between items-center 
                                bg-gray-50 dark:bg-[#050505]
                                p-4 rounded-lg shadow-sm cursor-pointer 
                                hover:bg-gray-100 dark:hover:bg-[#252525]
                                transition border border-gray-100 dark:border-white/5
                                "
                            >
                                <span
                                    className="text-xl font-bold text-gray-900 dark:text-white"
                                >
                                    {item.title}
                                </span>

                                {openIndex === index ? (
                                    <AiOutlineUp className="text-2xl text-gray-700 dark:text-gray-300" />
                                ) : (
                                    <AiOutlineDown className="text-2xl text-gray-700 dark:text-gray-300" />
                                )}
                            </button>

                            {/* Contenido desplegable */}
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-[800px] mt-2" : "max-h-0"
                                    }`}
                            >
                                <div
                                    className="
                                    bg-white dark:bg-[#050505]
                                    p-4 rounded-lg shadow-sm 
                                    text-gray-700 dark:text-gray-300
                                    border border-gray-100 dark:border-white/5
                                    "
                                >
                                    {item.content}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Área de ayuda general */}
                <div className="bg-gray-50 dark:bg-[#050505] p-6 rounded-lg shadow-lg transition-colors border border-gray-100 dark:border-white/5">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                        Ayuda y Soporte
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Bienvenido a la sección de ayuda. Aquí encontrarás respuestas a las preguntas
                        más frecuentes.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                        Preguntas Frecuentes
                    </h2>

                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                        <li>¿Cómo puedo crear una cuenta?</li>
                        <li>¿Cómo recupero mi contraseña?</li>
                        <li>¿Cómo contacto al soporte técnico?</li>
                        <li>Información sobre envíos y devoluciones.</li>
                    </ul>
                </div>

            </main>
        </div>
    );
}

