import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({ required_error: 'Nombre de usuario requerido' })
        .min(5, { message: 'El nombre de usuario debe tener al menos 5 caracteres' }),

    email: z.string({ required_error: 'Email es requerido' })
        .email({ message: 'Formato de email inválido' })
        .min(5, { message: 'El email debe tener al menos 5 caracteres' })
        .max(30, { message: 'El email debe tener menos de 30 caracteres' }),

    password: z.string({ required_error: 'Contraseña requerida' })
        .min(6, { message: 'El password debe tener al menos 6 caracteres' })
        .max(30, { message: 'El password debe tener menos de 30 caracteres' }),

    confirm: z.string({ required_error: 'Confirmar password requerido' })
        .min(6, { message: 'El password debe tener al menos 6 caracteres' })
        .max(30, { message: 'El password debe tener menos de 50 caracteres' })
})
    .refine((data) => data.password === data.confirm, {
        message: 'Las contraseñas no coinciden',
        path: ['confirm']
    });
