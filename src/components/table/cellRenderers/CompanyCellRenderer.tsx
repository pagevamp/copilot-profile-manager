import { Box, Stack, Typography } from '@mui/material';

export const CompanyCellRenderer = ({ value }: { value: string }) => {
  const c = value.split(' ');
  return (
    <Stack direction="row" alignItems="center" gap={3} marginTop="15px">
      <Box component="img" src={c[0]} alt="avatar" sx={{ width: '20px', height: '20px' }} />
      <Typography variant="sm" lineHeight={'16px'}>
        {c[1]}
      </Typography>
    </Stack>
  );
};
