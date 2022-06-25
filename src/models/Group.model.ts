import { z } from 'zod';

export const Group = z.object({
  id: z.string(),
  groupName: z.string(),
});

export type Group = z.infer<typeof Group>;
