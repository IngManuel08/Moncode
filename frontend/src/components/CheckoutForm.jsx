import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ onSuccess, onCancel, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required', // Avoids full page redirect if possible
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Pago exitoso. Procesando orden...");
            await onSuccess(); // Callback to actually create the order
        } else {
            setMessage("Sucedió un error inesperado.");
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Pagar ${total} MXN</h3>
            
            <PaymentElement />
            
            {message && <div className="text-red-500 mt-4 text-sm font-semibold">{message}</div>}
            
            <div className="flex gap-4 mt-6">
                <button 
                    type="button" 
                    onClick={onCancel}
                    disabled={isProcessing}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition-colors"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={isProcessing || !stripe || !elements} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                >
                    {isProcessing ? "Procesando..." : "Proceder al Pago"}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
