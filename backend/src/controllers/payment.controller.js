import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

// Se inicializa stripe con la clave secreta o una de prueba por defecto si no existe en .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51MockupKeyForTestingOnlyPLEASECHANGE'); // Note: The user will put their exact key in .env

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Monto inválido" });
        }

        // Create a PaymentIntent with the order amount and currency
        // amount in Stripe is in minimum units (cents for USD/MXN)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), 
            currency: 'mxn', // assuming Mexican Pesos, can be modified
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: error.message });
    }
};
