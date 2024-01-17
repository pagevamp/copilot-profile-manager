import { Box, Stack, Typography } from '@mui/material';
import { Sidebar } from './views/Sidebar';
import MainSection from './views/MainSection';

export default function Home() {
  return (
    <Stack direction="row">
      <MainSection />

      <Sidebar />
    </Stack>
  );
}
