import { z } from 'zod';

export const ClientProfileUpdatesRequestSchema = z.object({
  clientId: z.string().uuid(),
  companyId: z.string().uuid(),
  form: z.array(
    z.object({
      customFieldId: z.string().uuid(),
      value: z.string(),
    }),
  ),
});
export type ClientProfileUpdatesRequest = z.infer<typeof ClientProfileUpdatesRequestSchema>;

export const ClientProfileUpdatesResponseSchema = z.array(z.object({}));
