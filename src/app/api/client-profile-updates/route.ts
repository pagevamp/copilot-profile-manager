import { NextRequest, NextResponse } from 'next/server';
import { ClientProfileUpdatesRequestSchema, CustomFieldUpdates } from '@/types/clientProfileUpdates';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { getCurrentUser, handleError, respondError } from '@/utils/common';
import { ClientProfileUpdatesService } from '@/app/api/client-profile-updates/services/clientProfileUpdates.service';
import { ClientResponse } from '@/types/common';
import { z } from 'zod';
import { copilotApi } from 'copilot-node-sdk';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const clientProfileUpdateRequest = ClientProfileUpdatesRequestSchema.safeParse(data);
  if (!clientProfileUpdateRequest.success) {
    return NextResponse.json(clientProfileUpdateRequest.error.issues);
  }
  try {
    //todo: check access
    //todo: Refactor
    const copilotClient = new CopilotAPI(clientProfileUpdateRequest.data.token);
    const allCustomFields = (await copilotClient.getCustomFields()).data;
    if (!allCustomFields) {
      return respondError('Custom fields not defined.');
    }
    const allCustomFieldKeys = allCustomFields.map((customField) => customField.key);
    // todo:: Need to check if valid values are provided for custom fields. Copilot SDK only throws error when string value is sent for multiSelect fields
    // but not when array  sent for text fields
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
    const client: ClientResponse = await copilotClient.getClient(clientProfileUpdateRequest.data.clientId);
    let oldCustomFields: CustomFieldUpdates = [];
    if (client.customFields) {
      oldCustomFields = Object.entries(client.customFields).map(([key, value]) => ({
        key,
        value,
      }));
    }
    const newCustomFields = validFormCustomFields.filter((newField) => {
      let isOldFieldPresentWithSameValue = oldCustomFields.some((oldField) => {
        if (oldField.key !== newField.key) {
          return false;
        }

        let oldValue = Array.isArray(oldField.value) ? oldField.value.sort() : oldField.value;
        let newValue = Array.isArray(newField.value) ? newField.value.sort() : newField.value;

        return JSON.stringify(oldValue) === JSON.stringify(newValue);
      });

      return !isOldFieldPresentWithSameValue;
    });
    if (newCustomFields.length === 0) {
      return NextResponse.json({});
    }

    const clientUpdateResponse = await copilotClient.updateClient(clientProfileUpdateRequest.data.clientId, {
      customFields: customFieldBody,
    });
    //todo:: compare clientUpdateResponse.customFields with newCustomFields to make sure the values are updated in copilot SDK

    const service = new ClientProfileUpdatesService();
    await service.save({
      clientId: clientProfileUpdateRequest.data.clientId,
      companyId: clientProfileUpdateRequest.data.companyId,
      oldCustomFields: oldCustomFields,
      newCustomFields: newCustomFields,
    });

    return NextResponse.json(clientUpdateResponse);
    // return NextResponse.json({  });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  if (!token) {
    return respondError('Missing token', 422);
  }
  const copilotClient = new CopilotAPI(z.string().parse(token));
  const currentUser = await copilotClient.me();
  //todo:: check currentUser.isClientAccessLimited later
  const clients = await copilotClient.getClients();
  const clientLookup: Record<string, any> = {};
  clients.data?.forEach((client) => {
    clientLookup[client.id] = client;
  });
  const companies = await copilotClient.getCompanies();
  const companyLookup: Record<string, any> = {};
  companies.data?.forEach((company) => {
    companyLookup[company.id] = company;
  });
  const service = new ClientProfileUpdatesService();
  let clientProfileUpdates = await service.findByCompanyIds([]);
  clientProfileUpdates.forEach((update) => {});

  return NextResponse.json(clientProfileUpdates);
}
