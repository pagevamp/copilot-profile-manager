import { Box, Stack, Typography } from '@mui/material';

export const ClientCellRenderer = ({ value }: { value: { image: string; name: string; email: string } }) => {
  return (
    <Stack direction="row" alignItems="center" gap={3}>
      <Box component="img" src={value.image} alt="avatar" sx={{ width: '28px', height: '28px' }} />
      <Stack direction="column">
        <Typography variant="sm" lineHeight={'16px'}>
          {value.name}
        </Typography>
        <Typography variant="bodySm" lineHeight={'16px'}>
          {value.email}
        </Typography>
      </Stack>
    </Stack>
  );
};
