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
    await this.prismaClient.clientProtileUpdates.create({
      data: {
        clientId: requestData.clientId,
        companyId: requestData.companyId,
        portalId: requestData.portalId,
        customFields: requestData.customFields,
        changedFields: requestData.changedFields,
      },
    });
  }

  // Company Filter is not applied if companyIds is empty
  async findMany(portalId: string, companyIds: Array<string>): Promise<ClientProfileUpdatesResponse> {
    let clientProfileUpdates = [];
    if (companyIds.length > 0) {
      clientProfileUpdates = await this.prismaClient.clientProfileUpdates.findMany({
        where: {
          portalId: portalId,
          companyId: {
            in: companyIds,
          },
        },
      });
    } else {
      clientProfileUpdates = await this.prismaClient.clientProfileUpdates.findMany({
        where: {
          portalId: portalId,
        },
      });
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
      ORDER BY "createdAt" DESC
      LIMIT 5;
    `;
  }
}
