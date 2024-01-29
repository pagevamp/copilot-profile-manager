import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';
import {
  CustomFieldAccessRequest,
  CustomFieldAccessResponse,
  CustomFieldAccessResponseSchema,
} from '@/types/customFieldAccess';

export class CustomFieldAccessService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async save(requestData: CustomFieldAccessRequest): Promise<void> {
    let customFieldIds: string[] = requestData.accesses.map((access) => access.customFieldId);
    const deleteCustomFields = this.prismaClient.customFieldAccess.deleteMany({
      where: {
        AND: {
          customFieldId: {
            in: customFieldIds,
          },
          portalId: requestData.portalId,
        },
      },
    });
    const accesses = requestData.accesses.map((access) => {
      return {
        ...access,
        portalId: requestData.portalId,
      };
    });
    const createCustomFields = this.prismaClient.customFieldAccess.createMany({
      data: accesses,
    });

    await this.prismaClient.$transaction([deleteCustomFields, createCustomFields]);
  }

  async findAll(portalId: string): Promise<CustomFieldAccessResponse> {
    const customFieldAccesses = await this.prismaClient.customFieldAccess.findMany({
      where: {
        portalId: portalId,
      },
    });

    return CustomFieldAccessResponseSchema.parse(customFieldAccesses);
  }
}
