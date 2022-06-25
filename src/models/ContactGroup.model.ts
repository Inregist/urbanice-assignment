import { z } from 'zod';

export const ContactGroup = z.object({
  contactId: z.string(),
  groupId: z.string(),
});

export type ContactGroup = z.infer<typeof ContactGroup>;
