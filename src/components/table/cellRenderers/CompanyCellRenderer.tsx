import { Box, Stack, Typography } from '@mui/material';

export const CompanyCellRenderer = ({ value }: { value: { iconImageUrl: string; name: string } }) => {
  const { iconImageUrl, name } = value;
  return (
    <Stack direction="row" alignItems="center" gap={3} marginTop="15px">
      <Box component="img" src={iconImageUrl} alt="avatar" sx={{ width: '20px', height: '20px' }} />
      <Typography variant="sm" lineHeight={'16px'}>
        {name}
      </Typography>
    </Stack>
  );
};
