'use client';

import { useAppState } from '@/hooks/useAppState';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Header } from '@/layouts/Header';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TableCore } from '@/components/table/Table';
import { arraysHaveSameElements } from '@/utils/array';

const MainSection = () => {
  const appState = useAppState();
  const windowWidth = useWindowWidth();

  return (
    <Box
      sx={{
        flexBasis: 0,
        maxWidth: '100%',
        flexGrow: 1,
        height:
          arraysHaveSameElements(appState?.mutableSettings, appState?.settings) &&
          JSON.stringify(appState?.customFieldAccess) === JSON.stringify(appState?.mutableCustomFieldAccess)
            ? '100vh'
            : '92vh',
      }}
    >
      <Header />
      {windowWidth ? windowWidth <= 600 ? <Sidebar /> : <></> : <></>}

      {/* If window width is less than 600 and showSidebar is false then show <TableCore/> or else, show <TableCore /> always */}
      {windowWidth ? windowWidth <= 600 ? appState?.showSidebar ? null : <TableCore /> : <TableCore /> : <></>}
    </Box>
  );
};

export default MainSection;
