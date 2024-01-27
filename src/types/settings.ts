import { z } from 'zod';

enum ProfileLinks {
  ProfileSetting = 'profile_settings',
  PaymentMethod = 'payment_method',
}

export const SettingRequestSchema = z.object({
  token: z.string(),
  portalId: z.string(),
  profileLinks: z.array(z.nativeEnum(ProfileLinks)),
});
export type SettingRequest = z.infer<typeof SettingRequestSchema>;

export const SettingResponseSchema = z.object({
  id: z.string().uuid(),
  profileLinks: z.array(z.nativeEnum(ProfileLinks)),
});
export type SettingResponse = z.infer<typeof SettingResponseSchema>;
