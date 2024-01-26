'use client';

import { useAppState } from '@/hooks/useAppState';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Header } from '@/layouts/Header';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TableCore } from '@/components/table/Table';

const MainSection = () => {
  const appState = useAppState();
  const windowWidth = useWindowWidth();

  return (
    <Box
      sx={{
        flexBasis: 0,
        maxWidth: '100%',
        flexGrow: 1,
      }}
    >
      <Header />
      {windowWidth && (windowWidth <= 600 ? <Sidebar /> : null)}

      {/* If window width is less than 600 and showSidebar is false then show <TableCore/> or else, show <TableCore /> always */}
      {windowWidth && windowWidth <= 600 ? appState?.showSidebar ? null : <TableCore /> : <TableCore />}
    </Box>
  );
};

export default MainSection;
