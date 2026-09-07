import { Router } from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

//Importamos el validateSchema
import { validateSchema } from '../middlewares/validateSchema.js';

//Importamos los esquemas de validacion
import { loginSchema, registerSchema} from '../schemas/auth.schemas.js'

const router = Router();

//Ruta para registrar usuarios
router.post('/register', validateSchema(registerSchema), register);

//Ruta para iniciar sesion
router.post('/login', validateSchema(loginSchema), login);

//Ruta para cerrar sesion
router.post('/logout', logout);

//Ruta para obtener el perfil del usuario
router.get('/profile', authRequired, profile);

//Ruta para verificar token / sesion activa
router.get('/verifique', verifyToken);

export default router;
