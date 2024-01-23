import { Box, Typography } from '@mui/material';
import { ManagePageContainer } from './views/ManagePageContainer';

export default function Home() {
  return (
    <Box
      sx={{
        padding: { xs: '32px 16px', md: '124px 236px' },
      }}
    >
      <Typography variant="xl">Manage your profile</Typography>

      <ManagePageContainer />
    </Box>
  );
}
