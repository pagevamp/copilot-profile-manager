import { z } from 'zod';

export const PermissionsSchema = z.array(z.enum(['view', 'edit']));
export const CustomFieldAccessRequestSchema = z.object({
  token: z.string(),
  companyId: z.string().uuid(),
  accesses: z.array(
    z.object({
      customFieldId: z.string().uuid(),
      permissions: PermissionsSchema,
    }),
  ),
});
export type CustomFieldAccessRequest = z.infer<typeof CustomFieldAccessRequestSchema>;

export const CustomFieldAccessResponseSchema = z.array(
  z.object({
    customFieldId: z.string().uuid(),
    companyId: z.string().uuid(),
    permissions: PermissionsSchema,
  }),
);
export type CustomFieldAccessResponse = z.infer<typeof CustomFieldAccessResponseSchema>;
