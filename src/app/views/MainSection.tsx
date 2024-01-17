'use client';

import SearchBar from '@/components/searchBar/SearchBar';
import { Toggle } from '@/components/toggle/Toggle';
import { Box, Stack, Typography } from '@mui/material';

const MainSection = () => {
  return (
    <Box
      sx={{
        flexBasis: '70%',
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="lg">Client profile updates </Typography>
        <Stack direction="row">
          <SearchBar />
          <Toggle selected={true} handleClick={() => {}} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainSection;
