import DBClient from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import { SettingRequest, SettingResponse, SettingResponseSchema } from '@/types/settings';

export class SettingService {
  private prismaClient: PrismaClient = DBClient.getInstance();

  async findByPortalId(portalId: string): Promise<SettingResponse | null> {
    const setting = await this.prismaClient.setting.findFirst({
      where: {
        portalId: portalId,
      },
    });
    if (!setting) {
      return null;
    }

    return SettingResponseSchema.parse(setting);
  }

  async save(requestData: SettingRequest): Promise<void> {
    const settingByPortal = await this.prismaClient.setting.findFirst({
      where: {
        portalId: requestData.portalId,
      },
    });
    if (!settingByPortal) {
      await this.prismaClient.setting.create({
        data: {
          portalId: requestData.portalId,
          data: {
            profileLinks: requestData.profileLinks,
          },
        },
      });

      return;
    }

    await this.prismaClient.setting.update({
      where: {
        id: settingByPortal.id,
      },
      data: {
        data: {
          profileLinks: requestData.profileLinks,
        },
      },
    });
  }
}
