import { z } from 'zod';

export const customFieldUpdatesSchema = z.array(
  z.object({
    key: z.string(),
    value: z.union([z.string(), z.array(z.string())]),
  }),
);
export const ClientProfileUpdatesRequestSchema = z.object({
  token: z.string(),
  clientId: z.string().uuid(),
  companyId: z.string().uuid(),
  form: customFieldUpdatesSchema,
});
export type ClientProfileUpdatesRequest = z.infer<typeof ClientProfileUpdatesRequestSchema>;

export const ClientProfileUpdatesSchema = z.object({
  clientId: z.string().uuid(),
  companyId: z.string().uuid(),
  newCustomFields: customFieldUpdatesSchema,
  oldCustomFields: customFieldUpdatesSchema,
});
export type ClientProfileUpdates = z.infer<typeof ClientProfileUpdatesSchema>;
