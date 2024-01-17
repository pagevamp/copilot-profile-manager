'use client';

import { useAppState } from '@/hooks/useAppState';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Header } from '@/layouts/Header';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';

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

      {windowWidth &&
        (windowWidth <= 600 ? !appState?.showSidebar && <h1 style={{ padding: 20 }}>im body</h1> : <h1> im body </h1>)}
    </Box>
  );
};

export default MainSection;
