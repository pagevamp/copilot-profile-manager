import { apiUrl } from '@/config';
import { APIProps } from '@/types/api';
import { WorkspaceResponse } from '@/types/common';

// Fetch workspace from API
export async function getWorkspaceInfo({ token, portalId }: APIProps): Promise<WorkspaceResponse> {
  const res = await fetch(`${apiUrl}/api/workspace?token=${token}`, {
    next: { tags: ['workspace'] },
  });

  if (!res.ok) {
    throw new Error('Something went wrong in getWorkspaceInfo');
  }

  return (await res.json()) as WorkspaceResponse;
}
