import { Box, Stack, Typography } from '@mui/material';
import { Sidebar } from './views/Sidebar';
import MainSection from './views/MainSection';
import { SidebarDecider } from '@/hoc/SidebarDecider';

export default function Home() {
  return (
    <Stack direction="row">
      <MainSection />

      <SidebarDecider>
        <Sidebar />
      </SidebarDecider>
    </Stack>
  );
}
