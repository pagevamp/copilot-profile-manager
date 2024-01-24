import { NextRequest, NextResponse } from 'next/server';
import { ClientProfileUpdatesRequestSchema } from '@/types/clientProfileUpdates';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { handleError } from '@/utils/common';
import { ClientProfileUpdatesService } from '@/app/api/client-profile-updates/services/clientProfileUpdates.service';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const clientProfileUpdates = ClientProfileUpdatesRequestSchema.safeParse(data);
  if (!clientProfileUpdates.success) {
    return NextResponse.json(clientProfileUpdates.error.issues);
  }
  try {
    //todo: check access
    const copilotClient = new CopilotAPI(clientProfileUpdates.data.token);
    const existingCustomFields = (await copilotClient.getCustomFields()).data;
    const customFieldBody = clientProfileUpdates.data.form.reduce(
      (customFieldBody: Record<string, string | string[]>, customField) => {
        customFieldBody[customField.key] = customField.value;
        return customFieldBody;
      },
      {},
    );
    const response = await copilotClient.updateClient(clientProfileUpdates.data.clientId, { customFields: customFieldBody });
    const service = new ClientProfileUpdatesService();
    // await service.save()

    return NextResponse.json(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}
