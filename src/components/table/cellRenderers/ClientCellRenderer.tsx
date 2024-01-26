import { Box, Stack, Typography } from '@mui/material';

export const ClientCellRenderer = ({ value }: { value: string }) => {
  const c = value.split(' ');
  return (
    <Stack direction="row" alignItems="center" gap={3} marginTop="10px">
      <Box component="img" src={c[0]} alt="avatar" sx={{ width: '28px', height: '28px' }} />
      <Stack direction="column">
        <Typography variant="sm" lineHeight={'16px'}>
          {c[1]}
        </Typography>
        <Typography variant="bodySm" lineHeight={'16px'}>
          {c[2]}
        </Typography>
      </Stack>
    </Stack>
  );
};
