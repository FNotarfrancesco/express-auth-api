import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(2, 'El nombre es obligatorio'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirm_password: z.string(),
    code: z.string().min(1, 'El codigo de registro es obligatorio')
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password']
  })