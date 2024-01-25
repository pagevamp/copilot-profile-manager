import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';
import {
  ClientProfileUpdates,
  ClientProfileUpdatesResponse,
  ClientProfileUpdatesResponseSchema,
} from '@/types/clientProfileUpdates';

export class ClientProfileUpdatesService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async save(requestData: ClientProfileUpdates): Promise<void> {
    console.log('Old custom fields');
    console.log(requestData.oldCustomFields);
    console.log('New custom fields');
    console.log(requestData.newCustomFields);
    await this.prismaClient.clientProfileUpdates.create({
      data: {
        clientId: requestData.clientId,
        companyId: requestData.companyId,
        newCustomFields: requestData.newCustomFields,
        oldCustomFields: requestData.oldCustomFields,
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
}
