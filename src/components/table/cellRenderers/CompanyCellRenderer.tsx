import { Box, Stack, Typography } from '@mui/material';

export const CompanyCellRenderer = ({ value }: { value: { image: string; name: string } }) => {
  return (
    <Stack direction="row" alignItems="center" gap={3}>
      <Box component="img" src={value.image} alt="avatar" sx={{ width: '20px', height: '20px' }} />
      <Typography variant="sm" lineHeight={'16px'}>
        {value.name}
      </Typography>
    </Stack>
  );
};
