import { z } from 'zod';

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Please provide name' })
      .max(35, { message: 'Name must be less than 35 characters' }),
    lastName: z
      .string()
      .min(1, { message: 'Please provide last name' })
      .max(35, { message: 'Last name must be less than 35 characters' }),
    email: z.string().email({ message: 'Please provide email' }),
    password: z.string().min(8, { message: 'Please provide a valid password' }),
    confirmPassword: z.string().min(8, { message: 'Please provide a valid password' }),
    role: z.enum(['client', 'admin', 'superAdmin']).optional(),
  })
  .refine(
    (form) => {
      return form.confirmPassword === form.password;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export default signUpSchema;
