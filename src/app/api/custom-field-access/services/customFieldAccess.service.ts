import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';
import { CustomFieldAccessRequest } from '@/types/customFieldAccess';

export class CustomFieldAccessService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async save(requestData: CustomFieldAccessRequest): Promise<void> {
    let customFieldIds: string[] = requestData.map((data) => data.customFieldId);
    const deleteCustomFields = this.prismaClient.customFieldAccess.deleteMany({
      where: {
        customFieldId: {
          in: customFieldIds,
        },
      },
    });
    const createCustomFields = this.prismaClient.customFieldAccess.createMany({
      data: requestData,
    });

    await this.prismaClient.$transaction([deleteCustomFields, createCustomFields]);
  }
}
