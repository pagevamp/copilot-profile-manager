import { z } from 'zod';

export enum ProfileLinks {
  ProfileSetting = 'profile_settings',
  PaymentMethod = 'payment_method',
}

export enum Permissions {
  View = 'VIEW',
  Edit = 'EDIT',
}

export const SettingRequestSchema = z.object({
  token: z.string(),
  portalId: z.string(),
  profileLinks: z.array(z.nativeEnum(ProfileLinks)),
});
export type SettingRequest = z.infer<typeof SettingRequestSchema>;

export const SettingResponseSchema = z.object({
  id: z.string().uuid(),
  data: z.object({
    profileLinks: z.array(z.nativeEnum(ProfileLinks)),
  }),
});
export type SettingResponse = z.infer<typeof SettingResponseSchema>;
