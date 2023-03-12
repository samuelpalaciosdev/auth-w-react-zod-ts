import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(35, { message: 'Name must be less than 35 characters' }),
  lastName: z.string().min(1).max(35, { message: 'Last name must be less than 35 characters' }),
  email: z.string().email({ message: 'Please provide email' }),
  isActive: z.boolean().default(true),
  role: z.enum(['client', 'admin', 'superAdmin']),
});

export type User = z.infer<typeof userSchema>;
