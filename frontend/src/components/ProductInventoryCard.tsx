

interface Product {
    _id: string
    name: string
    price: number
    quantity: number
    description: string
    category: string
    image: string
    user: string
}

interface ProductInventoryCardProps {
    product: Product
    onEdit: () => void
    onDelete: () => void
}

export function ProductInventoryCard({ product, onEdit, onDelete }: ProductInventoryCardProps) {
    return (
        <div className="bg-gray-50 dark:bg-black rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-white/10">
            <div className="relative group overflow-hidden rounded-lg">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-sm">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors truncate">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 min-h-[40px]">{product.description}</p>
                
                <div className="flex justify-between items-center pt-2">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Precio</p>
                        <p className="text-lg font-bold text-gray-950 dark:text-gray-100">${product.price}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Existencias</p>
                        <p className={`text-lg font-bold ${product.quantity < 5 ? 'text-red-500' : 'text-gray-950 dark:text-gray-100'}`}>
                            {product.quantity}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-6">
                <button 
                    onClick={onEdit} 
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all active:scale-95 shadow-sm"
                >
                    Editar
                </button>
                <button 
                    onClick={onDelete} 
                    className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all active:scale-95 shadow-sm"
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}