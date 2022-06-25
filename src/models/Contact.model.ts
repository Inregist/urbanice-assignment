import { z } from 'zod';

export const Contact = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
  birthDate: z.date().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  url: z.string().url().optional(),
  imgUrl: z.string().url().optional(),
  groupId: z.string().optional(),
});

export type Contact = z.infer<typeof Contact>;
