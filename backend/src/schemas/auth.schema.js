// Improtar el objeto z de zod.
import { z } from 'zod';

// Requisitos que deben tener los datos para que sean validos
export const registerSchema = z.object({
    username: z
        .string({ required_error: 'Username is requiere' }),
    email: z
        .string({ required_error: 'Email is requiere' })
        .email({ message: 'Email is not vaild' }),
    password: z
        .string({ required_error: 'Password is requiere' })
        .min(6, { message: 'Password must be at laeast 6 characters' }),
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is requiere' })
        .email({ message: 'Email is not vaild' }),
    password: z
        .string({ required_error: 'Password is requiere' })
        .min(6, { message: 'Password must be at laeast 6 characters' }),
});

export const balanceSchema = z.object({
    saldo: z.number()
        .min(0, { message: 'Saldo must be a non-negative number' })
        .positive({ message: 'Saldo must be a positive number' })
});