import { Box, Stack, Typography } from '@mui/material';
import { ManagePageContainer } from './views/ManagePageContainer';
import { SimpleButton } from '@/components/styled/SimpleButton';
// import { EmptyStateFallback } from './views/EmptyStateFallback';

export default function Home() {
  return (
    <Box
      sx={{
        padding: { xs: '32px 16px', md: '124px 236px' },
      }}
    >
      <Typography variant="xl">Manage your profile</Typography>

      <ManagePageContainer />

      <Stack direction="column" mt={16} rowGap={4}>
        <Typography variant="xl">Other settings</Typography>
        <Stack direction="row" columnGap={4}>
          <SimpleButton>
            <Typography variant="md">Set a payment method</Typography>
          </SimpleButton>
          <SimpleButton>
            <Typography variant="md">Go to account settings</Typography>
          </SimpleButton>
        </Stack>
      </Stack>
    </Box>
  );
}
