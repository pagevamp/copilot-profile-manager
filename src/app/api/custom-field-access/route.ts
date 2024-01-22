import { NextRequest, NextResponse } from 'next/server';
import { CustomFieldAccessRequestSchema } from '@/types/customFieldAccess';
import { CustomFieldAccessService } from '@/app/api/custom-field-access/services/customFieldAccess.service';
import { errorHandler } from '@/utils/common';
import { CopilotAPI } from '@/utils/copilotApiUtils';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const companyId = searchParams.get('companyId');
  if (!token) {
    return errorHandler('Missing token', 422);
  }
  if (!companyId) {
    return errorHandler('Missing companyId', 422);
  }
  const copilotClient = new CopilotAPI(z.string().parse(token));
  const customFields = (await copilotClient.getCustomFields()).data;

  const customFieldAccessService = new CustomFieldAccessService();
  const customFieldAccesses = await customFieldAccessService.findAll(z.string().uuid().parse(companyId));

  const customFieldsWithAccess = customFields?.map((customField) => {
    const customFieldAccess = customFieldAccesses.find((access) => access.customFieldId === customField.id);
    return {
      ...customField,
      permission: customFieldAccess ? customFieldAccess.permission : null,
    };
  });

  return NextResponse.json({ data: customFieldsWithAccess });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const customFieldAccess = CustomFieldAccessRequestSchema.safeParse(data);
  if (!customFieldAccess.success) {
    return NextResponse.json(customFieldAccess.error.issues);
  }
  const customFieldAccessService = new CustomFieldAccessService();
  await customFieldAccessService.save(customFieldAccess.data);

  return NextResponse.json({});
}
