import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//importamos las rutas para usuario
import authRoutes from './routes/auth.routes.js';
//importamos las rutas para productos
import productRoutes from './routes/products.routes.js'
import orderRoutes from './routes/order.routes.js';
import jwt from 'jsonwebtoken';

import userRoutes from './routes/user.routes.js';
import paymentRoutes from './routes/payment.routes.js';
const { verify } = jwt;


const app = express();
app.use(cors({
    origin: [
        'http://localhost:5173', 
        process.env.FRONTEND_URL // Permitir URL del frontend en produccion
    ].filter(Boolean),
    credentials: true,
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); //cookies en formato json
app.use(express.urlencoded({ extended: false }));

//indicamos que el servidor utilice el objeto authRoutes
//http://localhost:3000/api/login    o /api/register
app.use('/api/', authRoutes)
app.use('/api/', productRoutes);
app.use('/api/', orderRoutes);
app.use('/api/', userRoutes);
app.use('/api/', paymentRoutes);

export default app;
