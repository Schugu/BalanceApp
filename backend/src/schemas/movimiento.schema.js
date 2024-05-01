// ESQUEMA DE VALIDACIÓN
import { z } from 'zod';

export const createMovimientoSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  description: z.string({ required_error: 'Description must be a string' }),
  balance: z.number({ required_error: 'Balance must be a number' }),
});