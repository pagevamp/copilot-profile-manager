'use client';

import SearchBar from '@/components/searchBar/SearchBar';
import { Toggle } from '@/components/toggle/Toggle';
import { Box, Stack, Typography } from '@mui/material';

const MainSection = () => {
  return (
    <Box
      sx={{
        flexBasis: '73%',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.color.borders.border}`,
          borderTop: `1px solid ${theme.color.borders.border}`,
          padding: '20px 24px',
        })}
      >
        <Typography variant="lg" fontSize="13px">
          Client profile updates{' '}
        </Typography>
        <Stack direction="row" columnGap={4} alignItems="center">
          <SearchBar />
          <Toggle selected={true} handleClick={() => {}} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainSection;
