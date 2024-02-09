import { Box, Stack, Typography } from '@mui/material';

export const ClientCellRenderer = ({ value }: { value: { avatarImageUrl: string; email: string; name: string } }) => {
  const { avatarImageUrl, email, name } = value;
  return (
    <Stack direction="row" alignItems="center" gap={3} marginTop="10px">
      <Box component="img" src={avatarImageUrl} alt="avatar" sx={{ width: '28px', height: '28px' }} />
      <Stack direction="column">
        <Typography variant="sm" lineHeight={'16px'}>
          {name}
        </Typography>
        <Typography variant="bodySm" lineHeight={'16px'}>
          {email}
        </Typography>
      </Stack>
    </Stack>
  );
};
