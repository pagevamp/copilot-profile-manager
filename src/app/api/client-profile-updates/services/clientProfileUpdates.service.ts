import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';
import {
  ClientProfileUpdates,
  ClientProfileUpdatesResponse,
  ClientProfileUpdatesResponseSchema,
  UpdateHistory,
} from '@/types/clientProfileUpdates';

export class ClientProfileUpdatesService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async save(requestData: ClientProfileUpdates): Promise<void> {
    await this.prismaClient.clientProfileUpdates.create({
      data: {
        clientId: requestData.clientId,
        companyId: requestData.companyId,
        customFields: requestData.customFields,
        changedFields: requestData.changedFields,
      },
    });
  }

  async findByCompanyIds(companyIds: Array<string>): Promise<ClientProfileUpdatesResponse> {
    let clientProfileUpdates = [];
    if (companyIds.length > 0) {
      clientProfileUpdates = await this.prismaClient.clientProfileUpdates.findMany({
        where: {
          id: {
            in: companyIds,
          },
        },
      });
    } else {
      clientProfileUpdates = await this.prismaClient.clientProfileUpdates.findMany();
    }

    return ClientProfileUpdatesResponseSchema.parse(clientProfileUpdates);
  }

  async getUpdateHistory(customFieldKey: string, clientId: string, lastUpdated: Date): Promise<UpdateHistory[]> {
    return this.prismaClient.$queryRaw`
      SELECT "changedFields"
      FROM "ClientProfileUpdates"
      WHERE "clientId" = ${clientId}::uuid
      AND "createdAt" <= ${lastUpdated}
      AND "changedFields" ->> ${customFieldKey} IS NOT NULL
      ORDER BY "createdAt" DESC;
    `;
  }
}
