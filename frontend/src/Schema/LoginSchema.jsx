import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ required_error: 'Email requerido' })
        .min(5,
            { message: 'El email debe tener al menos 5 caracteres' }),
    password: z.string({ required_error: 'Contraseña requerida' })
        .min(6, {
            message: 'La contraseña debe tener al menos 6 caracteres'
        })
        .max(30, {
            message: 'La contraseña debe tener menos de 30 caracteres'
        })
})