import { NextRequest, NextResponse } from 'next/server';
import { ClientProfileUpdatesRequestSchema } from '@/types/clientProfileUpdates';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { errorHandler } from '@/utils/common';
import { ApiError } from 'copilot-node-sdk/codegen/api';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const clientProfileUpdates = ClientProfileUpdatesRequestSchema.safeParse(data);
  if (!clientProfileUpdates.success) {
    return NextResponse.json(clientProfileUpdates.error.issues);
  }
  try {
    const copilotClient = new CopilotAPI(clientProfileUpdates.data.token);
    const customFields = clientProfileUpdates.data.form.reduce(
      (customFields: Record<string, string | string[]>, customField) => {
        customFields[customField.key] = customField.value;
        return customFields;
      },
      {},
    );
    console.log(customFields);
    const response = await copilotClient.updateClient(clientProfileUpdates.data.clientId, { customFields });
    console.log(response);

    return NextResponse.json({});
  } catch (error) {
    const apiError = error as ApiError;
    console.error(apiError);
    return errorHandler(apiError.body.message, apiError.status);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({});
}
