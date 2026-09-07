import {email, z} from 'zod';

export const registerSchema = z.object({
    username: z.string('Nombre de usuario requerido')
        .min(5, 
            {error: 'El nombre de ususario debe tener al menos 5 caracteres'}),
    email: z.email({
        error: (email) => email.input === undefined ? 'Email es requerido'
                                                    : 'Formato de Email invalido'
    }),
    password: z.string('Contraseña requerida')
        .min(6, {
            error: 'El password debe tener al menos 6 caracteres'
        })
}); //fin de registerschema

export const loginSchema = z.object({
email: z.email({
        error: (email) => email.input === undefined ? 'Email es requerido'
                                                    : 'Formato de Email invalido'
    }),
    password: z.string('Contraseña requerida')
        .min(6, {
            error: 'El password debe tener al menos 6 caracteres'
        })
}); //fin de loginSchema
