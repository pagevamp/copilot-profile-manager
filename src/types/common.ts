import { z } from 'zod';

export const MeResponseSchema = z.object({
  id: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
  portalName: z.string(),
});
export type MeResponse = z.infer<typeof MeResponseSchema>;

export const ClientResponseSchema = z.object({
  id: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
  companyId: z.string(),
  status: z.string(),
  avatarImageUrl: z.string().nullable(),
  customFields: z.record(z.string(), z.union([z.string(), z.array(z.string())])).nullable(),
});
export type ClientResponse = z.infer<typeof ClientResponseSchema>;

export const ClientsResponseSchema = z.object({
  data: z.array(ClientResponseSchema).nullable(),
});
export type ClientsResponse = z.infer<typeof ClientsResponseSchema>;

export const CompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconImageUrl: z.string().nullable(),
});
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>;

export const CompaniesResponseSchema = z.object({
  data: z.array(CompanyResponseSchema).nullable(),
});
export type CompaniesResponse = z.infer<typeof CompaniesResponseSchema>;

export const CustomFieldSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  type: z.string(),
  order: z.number(),
  object: z.string(),
  options: z
    .array(
      z.object({
        id: z.string(),
        key: z.string(),
        label: z.string(),
        color: z.string(),
      }),
    )
    .optional(),
});
export const CustomFieldResponseSchema = z.object({
  data: z.array(CustomFieldSchema).nullable(),
});
export type CustomFieldResponse = z.infer<typeof CustomFieldResponseSchema>;

export const ClientRequestSchema = z.object({
  givenName: z.string().optional(),
  familyName: z.string().optional(),
  companyId: z.string().uuid().optional(),
  customFields: z.record(z.union([z.string(), z.array(z.string())])).optional(),
});
export type ClientRequest = z.infer<typeof ClientRequestSchema>;
