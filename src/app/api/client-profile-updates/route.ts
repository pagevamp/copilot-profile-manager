import { NextRequest, NextResponse } from 'next/server';
import { ClientProfileUpdatesRequestSchema, ParsedClientProfileUpdatesResponse } from '@/types/clientProfileUpdates';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { handleError, respondError } from '@/utils/common';
import { ClientProfileUpdatesService } from '@/app/api/client-profile-updates/services/clientProfileUpdates.service';
import { ClientResponse, CompanyResponse } from '@/types/common';
import { z } from 'zod';
import { createLookup, getObjectDifference, getSelectedOptions } from '@/lib/helper';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const clientProfileUpdateRequest = ClientProfileUpdatesRequestSchema.safeParse(data);
  if (!clientProfileUpdateRequest.success) {
    return NextResponse.json(clientProfileUpdateRequest.error.issues, { status: 422 });
  }
  try {
    //todo: check access
    const copilotClient = new CopilotAPI(clientProfileUpdateRequest.data.token);
    const client: ClientResponse = await copilotClient.getClient(clientProfileUpdateRequest.data.clientId);
    const clientUpdateResponse = await copilotClient.updateClient(clientProfileUpdateRequest.data.clientId, {
      customFields: clientProfileUpdateRequest.data.form,
    });
    const changedFields = getObjectDifference(clientUpdateResponse.customFields ?? {}, client.customFields ?? {});
    if (Object.keys(changedFields).length === 0) {
      return respondError('No changes detected.', 400);
    }

    const service = new ClientProfileUpdatesService();
    await service.save({
      clientId: clientProfileUpdateRequest.data.clientId,
      companyId: clientProfileUpdateRequest.data.companyId,
      customFields: clientUpdateResponse.customFields ?? {},
      changedFields,
    });

    return NextResponse.json(clientUpdateResponse);
    // return NextResponse.json({  });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return respondError('Missing token', 422);
  }

  try {
    const copilotClient = new CopilotAPI(z.string().parse(token));

    const [currentUser, clients, companies, portalCustomFields] = await Promise.all([
      copilotClient.me(),
      copilotClient.getClients(),
      copilotClient.getCompanies(),
      copilotClient.getCustomFields(),
    ]);
    //todo:: filter companyIds based on currentUser restrictions
    const clientProfileUpdates = await new ClientProfileUpdatesService().findByCompanyIds([]);

    const clientLookup = createLookup(clients.data, 'id');
    const companyLookup = createLookup(companies.data, 'id');

    const parsedClientProfileUpdates: ParsedClientProfileUpdatesResponse[] = clientProfileUpdates.map((update) => {
      const client = clientLookup[update.clientId];
      const company = companyLookup[update.companyId];

      const customFields = portalCustomFields.data?.map((portalCustomField) => {
        const value = update.customFields[portalCustomField.key] ?? null;
        const options = getSelectedOptions(portalCustomField, value);

        return {
          name: portalCustomField.name,
          type: portalCustomField.type,
          key: portalCustomField.key,
          value: options.length > 0 ? options : value,
          isChanged: !!update.changedFields[portalCustomField.key],
        };
      });

      return {
        id: update.id,
        client: getClientDetails(client),
        company: getCompanyDetails(company),
        lastUpdated: update.createdAt,
        customFields,
      };
    });

    return NextResponse.json(parsedClientProfileUpdates);
  } catch (error) {
    return handleError(error);
  }
}

function getClientDetails(client: ClientResponse) {
  return {
    id: client.id,
    name: `${client.givenName} ${client.familyName}`,
    email: client.email,
    avatarImageUrl: client.avatarImageUrl,
  };
}

function getCompanyDetails(company: CompanyResponse) {
  return {
    id: company.id,
    name: company.name,
    iconImageUrl: company.iconImageUrl,
  };
}
