import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';
import { ClientProfileUpdates } from '@/types/clientProfileUpdates';

export class ClientProfileUpdatesService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async save(requestData: ClientProfileUpdates): Promise<void> {
    await this.prismaClient.clientProfileUpdates.create({
      data: {
        clientId: requestData.clientId,
        companyId: requestData.companyId,
        newCustomFields: requestData.newCustomFields,
        oldCustomFields: requestData.oldCustomFields,
      },
    });
  }
}
