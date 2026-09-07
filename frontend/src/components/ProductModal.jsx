import { useState } from 'react';
import { createProductReview } from '../api/products.js';
import { useAuth } from '../context/Authcontext.jsx';

function ProductModal({ product, onClose, onReviewAdded }) {
    const { isAuthenticated, user } = useAuth();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            await createProductReview(product._id, { rating, comment });
            setSuccess("Reseña agregada exitosamente");
            setError("");
            setComment("");
            setRating(5);
            if (onReviewAdded) onReviewAdded();
        } catch (err) {
            setError(err.response?.data?.message || "Error al enviar la reseña");
            setSuccess("");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
            <div className="bg-white dark:bg-black rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative transition-all border border-gray-100 dark:border-white/10">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white z-10 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                {/* Imagen del producto */}
                <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 transition-colors border-r dark:border-gray-700">
                    <img src={product.image} alt={product.name} className="max-h-80 object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
                    <div className="mt-8 text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{product.description}</p>
                        <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mt-6">${product.price}</p>
                    </div>
                </div>

                {/* Reseñas y Comentarios */}
                <div className="w-full md:w-1/2 p-8 flex flex-col bg-white dark:bg-black transition-colors">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Reseñas del Producto</h3>
                    
                    <div className="flex items-center mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border dark:border-gray-700">
                        <span className="text-yellow-400 text-3xl mr-2">★</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.rating ? product.rating.toFixed(1) : 0} / 5</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-3 font-medium">({product.numReviews} reseñas)</span>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-8 pr-2 custom-scrollbar space-y-4">
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((r, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-gray-900 dark:text-white">{r.name}</span>
                                        <span className="text-yellow-500 text-sm">{'★'.repeat(r.rating)}</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{r.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-500 italic text-center py-8">No hay reseñas todavía. ¡Sé el primero en calificarlo!</p>
                        )}
                    </div>

                    {/* Formulario de Nueva Reseña */}
                    <div className="border-t dark:border-gray-700 pt-6 mt-auto">
                        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Escribe tu reseña</h4>
                        {isAuthenticated && user?.role !== 'admin' ? (
                            <form onSubmit={submitReview} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Calificación</label>
                                    <select 
                                        value={rating} 
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    >
                                        <option value="5">⭐⭐⭐⭐⭐ - Excelente</option>
                                        <option value="4">⭐⭐⭐⭐ - Muy Bueno</option>
                                        <option value="3">⭐⭐⭐ - Bueno</option>
                                        <option value="2">⭐⭐ - Regular</option>
                                        <option value="1">⭐ - Malo</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Comentario</label>
                                    <textarea 
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                                        rows="3"
                                        placeholder="¿Qué te pareció el producto?"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                                {success && <p className="text-green-500 text-sm font-medium">{success}</p>}
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]">
                                    Enviar Reseña
                                </button>
                            </form>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center font-medium border dark:border-gray-700">
                                Debes iniciar sesión con una cuenta de cliente para valorar este producto.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductModal;
