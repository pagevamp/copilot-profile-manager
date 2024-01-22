import { z } from 'zod';
import { Permission } from '@prisma/client';

export const CustomFieldAccessRequestSchema = z.object({
  token: z.string(),
  companyId: z.string().uuid(),
  accesses: z.array(
    z.object({
      customFieldId: z.string().uuid(),
      permission: z.nativeEnum(Permission),
    }),
  ),
});
export type CustomFieldAccessRequest = z.infer<typeof CustomFieldAccessRequestSchema>;

export const CustomFieldAccessResponseSchema = z.array(
  z.object({
    customFieldId: z.string().uuid(),
    companyId: z.string().uuid(),
    permission: z.nativeEnum(Permission),
  }),
);
export type CustomFieldAccessResponse = z.infer<typeof CustomFieldAccessResponseSchema>;
