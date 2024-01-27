import { respondError } from '@/utils/common';
import { NextRequest, NextResponse } from 'next/server';
import { ClientProfileUpdatesService } from '@/app/api/client-profile-updates/services/clientProfileUpdates.service';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const clientId = searchParams.get('clientId');
  const key = searchParams.get('key');
  const lastUpdated = searchParams.get('lastUpdated');
  if (!token) {
    return respondError('Missing token', 422);
  }
  if (!clientId) {
    return respondError('Missing clientId', 422);
  }

  const updates = await new ClientProfileUpdatesService().getUpdateHistory(z.string().parse(key));
  console.log(updates);

  return NextResponse.json(updates);
}
