'use client';

import SearchBar from '@/components/searchBar/SearchBar';
import { Box, Stack, Typography } from '@mui/material';

const MainSection = () => {
  return (
    <Box
      sx={{
        flexBasis: '70%',
      }}
    >
      <Stack direction="row">
        <Typography variant="lg">Client profile updates </Typography>
        <SearchBar />
      </Stack>
    </Box>
  );
};

export default MainSection;
