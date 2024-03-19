import { z } from 'zod';
import { Permission } from '@prisma/client';

export const CustomFieldAccessRequestSchema = z.object({
  token: z.string(),
  portalId: z.string(),
  accesses: z.array(
    z.object({
      customFieldId: z.string().uuid(),
      permissions: z.array(z.nativeEnum(Permission)),
    }),
  ),
});
export type CustomFieldAccessRequest = z.infer<typeof CustomFieldAccessRequestSchema>;

export const CustomAccessFieldSchema = z.object({
  customFieldId: z.string().uuid(),
  portalId: z.string(),
  permissions: z.array(z.nativeEnum(Permission)),
});
export type CustomAccessField = z.infer<typeof CustomAccessFieldSchema>;

export const CustomFieldAccessResponseSchema = z.array(CustomAccessFieldSchema);
export type CustomFieldAccessResponse = z.infer<typeof CustomFieldAccessResponseSchema>;

export type ModifiedPermissionAccessField = Omit<CustomAccessField, 'permissions'> & { permission: string[] };
