import { lowerCase } from 'lodash';
import { z } from 'zod';

export const Group = z.object({
  id: z.string(),
  groupName: z.string().refine((gName) => lowerCase(gName) !== 'other', {
    message: 'group name "Other" is reserved',
  }),
});

export type Group = z.infer<typeof Group>;
