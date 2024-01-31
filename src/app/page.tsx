import { Stack } from '@mui/material';
import { Sidebar } from './views/Sidebar';
import MainSection from './views/MainSection';
import { SidebarDecider } from '@/hoc/SidebarDecider';
import { apiUrl } from '@/config';
import { ParsedClientProfileUpdatesResponse } from '@/types/clientProfileUpdates';

export const revalidate = 0;

async function getClientProfileUpdates({
  token,
  portalId,
}: {
  token: string;
  portalId: string;
}): Promise<ParsedClientProfileUpdatesResponse[]> {
  const res = await fetch(`${apiUrl}/api/client-profile-updates?token=${token}&portalId=${portalId}`);

  if (!res.ok) {
    throw new Error('Something went wrong while in getClientProfileUpdates');
  }

  const data = await res.json();

  return data;
}

export default async function Home({ searchParams }: { searchParams: { token: string; portalId: string } }) {
  const { token, portalId } = searchParams;

  const clientProfileUpdates = await getClientProfileUpdates({ token, portalId });

  return (
    <Stack direction="row">
      <MainSection clientProfileUpdates={clientProfileUpdates} />

      <SidebarDecider>
        <Sidebar />
      </SidebarDecider>
    </Stack>
  );
}
