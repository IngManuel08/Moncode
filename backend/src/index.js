import app from './app.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';
import {v2 as cloudinary } from 'cloudinary';

export { authRequired as requireSignIn } from './middlewares/validateToken.js';
export { isAdmin } from './middlewares/isAdmin.js';
export { validateSchema } from './middlewares/validateSchema.js';


//Configuramos la lectura de variables de entorno 
//para configurar la conexion cloudinary
dotenv.config();

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Servidor corriendo en el puerto ${port}`);
