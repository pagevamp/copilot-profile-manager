import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';
import { ClientProfileUpdates } from '@/types/clientProfileUpdates';

export class ClientProfileUpdatesService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async save(requestData: ClientProfileUpdates): Promise<void> {
    console.log('Old custom fields');
    console.log(requestData.oldCustomFields);
    console.log('New custom fields');
    console.log(requestData.newCustomFields);
    // await this.prismaClient.clientProfileUpdates.create({
    //   data: {
    //     clientId: requestData.clientId,
    //     companyId: requestData.companyId,
    //     newCustomFields: requestData.newCustomFields,
    //     oldCustomFields: requestData.oldCustomFields,
    //   },
    // });
  }
}
