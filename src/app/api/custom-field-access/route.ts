import { NextRequest, NextResponse } from 'next/server';
import { CustomFieldAccessRequestSchema } from '@/types/customFieldAccess';
import { CustomFieldAccessService } from '@/app/api/custom-field-access/services/customFieldAccess.service';

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
