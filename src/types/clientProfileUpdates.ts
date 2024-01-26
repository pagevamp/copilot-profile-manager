import { z } from 'zod';

export const CustomFieldUpdatesSchema = z.array(
  z.object({
    key: z.string(),
    value: z.union([z.string(), z.array(z.string())]),
  }),
);
export type CustomFieldUpdates = z.infer<typeof CustomFieldUpdatesSchema>;

export const ClientProfileUpdatesRequestSchema = z.object({
  token: z.string(),
  clientId: z.string().uuid(),
  companyId: z.string().uuid(),
  form: CustomFieldUpdatesSchema,
});
export type ClientProfileUpdatesRequest = z.infer<typeof ClientProfileUpdatesRequestSchema>;

export const ClientProfileUpdatesSchema = z.object({
  clientId: z.string().uuid(),
  companyId: z.string().uuid(),
  newCustomFields: CustomFieldUpdatesSchema,
  oldCustomFields: CustomFieldUpdatesSchema,
});
export type ClientProfileUpdates = z.infer<typeof ClientProfileUpdatesSchema>;

export const ClientProfileUpdatesResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    companyId: z.string().uuid(),
    newCustomFields: CustomFieldUpdatesSchema,
    oldCustomFields: CustomFieldUpdatesSchema,
    // updatedAt: z.date(),
  }),
);
export type ClientProfileUpdatesResponse = z.infer<typeof ClientProfileUpdatesResponseSchema>;

export const ParsedClientProfileUpdatesResponseSchema = z.object({
  id: z.string().uuid(),
  client: z.object({
    name: z.string(),
    email: z.string(),
    avatarImageUrl: z.string().nullable(),
  }),
  company: z.object({
    name: z.string(),
    iconImageUrl: z.string().nullable(),
  }),
  // lastUpdated: z.date(),
  // customFields: z.array(z.object({
  //   name: z.string(),
  //   key: z.string(),
  //   value: z.union([z.string(), z.array(z.string())]),
  //   isChanged: z.boolean(),
  // }))
});
export type ParsedClientProfileUpdatesResponse = z.infer<typeof ParsedClientProfileUpdatesResponseSchema>;
