import { PrismaClient } from '@prisma/client';
import DBClient from '@/lib/db';

export class ClientProfileUpdatesService {
  private prismaClient: PrismaClient = DBClient.getInstance();
}
