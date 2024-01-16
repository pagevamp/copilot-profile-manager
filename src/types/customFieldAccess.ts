import { z } from 'zod';
import { CustomFieldSchema } from '@/types/common';

export const PermissionsSchema = z.array(z.enum(['view', 'edit']));
export const CustomFieldAccessRequestSchema = z.array(
  z.object({
    customFieldId: z.string().uuid(),
    permissions: PermissionsSchema,
  }),
);
export type CustomFieldAccessRequest = z.infer<typeof CustomFieldAccessRequestSchema>;

export const CustomFieldAccessResponseSchema = z.object({
  permissions: PermissionsSchema,
  customField: CustomFieldSchema,
});
export type CustomFieldAccessResponse = z.infer<typeof CustomFieldAccessResponseSchema>;
