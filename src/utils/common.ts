import { NextResponse } from 'next/server';
import { CopilotAPI } from './copilotApiUtils';
import { MeResponse } from '@/types/common';
import { ApiError } from 'copilot-node-sdk/codegen/api';

export async function getCurrentUser(apiToken: string): Promise<MeResponse> {
  const copilotClient = new CopilotAPI(apiToken);

  return await copilotClient.me();
}

export function respondError(message: string, status: number = 500) {
  return NextResponse.json(
    { message },
    {
      status,
    },
  );
}

export function handleError(error: unknown) {
  console.error(error);
  let apiError = {
    message: 'Something went wrong',
    status: 500,
  };
  if (error instanceof ApiError) {
    apiError = {
      message: error.body.message,
      status: error.status,
    };
  }
  return respondError(apiError.message, apiError.status);
}
