import { Router } from 'express';
import { login, register, logout, profile } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

//importar el middleware de esquemas
import { validateSchema } from '../middlewares/validateSchema.js';

//importamos los esquemas de validacion
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js'
import { updateProfile } from '../controllers/user.controller.js';

const router = Router();

//ruta para registrar usuarios
router.post('/register', validateSchema(registerSchema), register);

//ruta para iniciar sesion
router.post('/login', validateSchema(loginSchema), login);

//ruta para cerrar sesion 
router.post('/logout', logout);

//ruta para obtener el perfil
router.get('/profile', authRequired, profile);

//ruta para actualizar el perfil
router.put('/profile', authRequired, updateProfile);

export default router;
