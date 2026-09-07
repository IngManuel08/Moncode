import type { Product } from "../types/product"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-gray-50 dark:bg-black rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10 flex flex-col h-full group">
            {/* Imagen del producto */}
            <div className="relative w-full h-56 bg-white dark:bg-gray-900/50 flex items-center justify-center overflow-hidden">
                {product.image ? (
                    <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                ) : (
                    <span className="text-gray-400 dark:text-gray-500 font-bold text-xl uppercase tracking-widest">MONCODE</span>
                )}
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-100 dark:border-white/10">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex flex-col flex-1">
                {/* Nombre y precio */}
                <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight flex-1 transition-colors">
                        {product.name}
                    </h3>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 text-xl whitespace-nowrap">
                        ${product.price}
                    </span>
                </div>

                {/* Descripción */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 transition-colors flex-1">
                    {product.description}
                </p>

                {/* Footer con cantidad */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${product.quantity > 5 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Stock: {product.quantity}
                        </span>
                    </div>
                </div>
            </div>

            {/* Botones de acción (Admin only/hover) */}
            <div className="flex gap-1 p-2 bg-gray-100 dark:bg-[#252525] border-t border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 text-[10px] h-8 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-bold uppercase tracking-wider">
                    Info
                </button>
                <button className="flex-1 text-[10px] h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-bold uppercase tracking-wider">
                    Imagen
                </button>
                <button className="flex-1 text-[10px] h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-bold uppercase tracking-wider">
                    Borrar
                </button>
            </div>
        </div>
    )
}