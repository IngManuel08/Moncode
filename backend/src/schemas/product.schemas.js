import { z } from 'zod';

export const productSchema = z.object({
    name: z.string({ error_message: 'Nombre del producto requerido' })
        .min(1, 'Nombre del producto requerido'),
    price: z.union([
        z.string().transform((val) => parseFloat(val)),
        z.number()
    ])
        .pipe(
            z.number('Precio del producto requerido')
                .positive('Precio debe ser mayor a 0')
                .refine((val) => !isNaN(val), { message: 'El precio debe ser un numero valido' })
        ),
    quantity: z.union([
        z.string().transform((val) => parseInt(val)),
        z.number()
    ])
        .pipe(
            z.number()
                .int({ message: 'Cantidad del producto requerida' })
                .min(0, { message: 'La cantidad debe ser mayor o igual a 0' })
                .refine((val) => !isNaN(val), { message: 'La cantidad debe ser un numero valido' })
        ),
    description: z.string({ error_message: 'Descripción del producto requerida' })
        .min(5, { message: 'La descripción debe tener al menos 5 caracteres' }),
    category: z.string({ error_message: 'Categoría del producto requerida' })
        .min(3, { message: 'La categoría debe tener al menos 3 caracteres' }),
}); //fin de productSchema

export const productUpdateSchema = z.object({
    name: z.string().min(1, 'Nombre del producto requerido'),
    price: z.number('Precio del producto requerido')
        .positive('El precio debe ser mayor a 0')
        .refine((val) => !isNaN(val), { message: 'El precio debe ser un numero valido' }),
    quantity: z.number()
        .int({ message: 'Cantidad del producto requerida' })
        .min(0, { message: 'La cantidad debe ser mayor o igual a 0' })
        .refine((val) => !isNaN(val), { message: 'La cantidad debe ser un numero valido' }),
    description: z.string()
        .min(5, { message: 'La descripción debe tener al menos 5 caracteres' }),
    category: z.string()
        .min(3, { message: 'La categoría debe tener al menos 3 caracteres' }),
    image: z.string().optional()   // ← FIX IMPORTANTE
})

