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
          companyId: requestData.companyId,
        },
      },
    });
    const accesses = requestData.accesses.map((access) => {
      return {
        ...access,
        companyId: requestData.companyId,
      };
    });
    const createCustomFields = this.prismaClient.customFieldAccess.createMany({
      data: accesses,
    });

    await this.prismaClient.$transaction([deleteCustomFields, createCustomFields]);
  }

  async findAll(companyId: string): Promise<CustomFieldAccessResponse> {
    const customFieldAccesses = await this.prismaClient.customFieldAccess.findMany({
      where: {
        companyId: companyId,
      },
    });

    return CustomFieldAccessResponseSchema.parse(customFieldAccesses);
  }
}
