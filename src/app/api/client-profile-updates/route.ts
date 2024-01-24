import { NextRequest, NextResponse } from 'next/server';
import { ClientProfileUpdatesRequestSchema, CustomFieldUpdates } from '@/types/clientProfileUpdates';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { handleError, respondError } from '@/utils/common';
import { ClientProfileUpdatesService } from '@/app/api/client-profile-updates/services/clientProfileUpdates.service';
import { ClientResponse } from '@/types/common';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const clientProfileUpdateRequest = ClientProfileUpdatesRequestSchema.safeParse(data);
  if (!clientProfileUpdateRequest.success) {
    return NextResponse.json(clientProfileUpdateRequest.error.issues);
  }
  try {
    //todo: check access
    const copilotClient = new CopilotAPI(clientProfileUpdateRequest.data.token);
    const allCustomFields = (await copilotClient.getCustomFields()).data;
    if (!allCustomFields) {
      return respondError('Custom fields not defined.');
    }
    const allCustomFieldKeys = allCustomFields.map((customField) => customField.key);
    // No need to check if valid values are provided for custom fields as the copilot SDK throws error. E.g: string value sent for multiSelect fields
    const validFormCustomFields = clientProfileUpdateRequest.data.form.filter((customField) =>
      allCustomFieldKeys.includes(customField.key),
    );
    const customFieldBody = validFormCustomFields.reduce(
      (customFieldBody: Record<string, string | string[]>, customField) => {
        customFieldBody[customField.key] = customField.value;
        return customFieldBody;
      },
      {},
    );
    const clientUpdateResponse = await copilotClient.updateClient(clientProfileUpdateRequest.data.clientId, {
      customFields: customFieldBody,
    });
    const client: ClientResponse = await copilotClient.getClient(clientProfileUpdateRequest.data.clientId);
    let oldCustomFields: CustomFieldUpdates = [];
    if (client.customFields) {
      oldCustomFields = Object.entries(client.customFields).map(([key, value]) => ({
        key,
        value,
      }));
    }

    const service = new ClientProfileUpdatesService();
    await service.save({
      clientId: clientProfileUpdateRequest.data.clientId,
      companyId: clientProfileUpdateRequest.data.companyId,
      oldCustomFields: oldCustomFields,
      newCustomFields: [],
    });

    return NextResponse.json(clientUpdateResponse);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}
