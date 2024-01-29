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

export const CustomFieldAccessResponseSchema = z.array(
  z.object({
    customFieldId: z.string().uuid(),
    portalId: z.string(),
    permissions: z.array(z.nativeEnum(Permission)),
  }),
);
export type CustomFieldAccessResponse = z.infer<typeof CustomFieldAccessResponseSchema>;
