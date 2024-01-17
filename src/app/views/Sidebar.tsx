'use client';

import { CustomFieldAccessTable } from '@/components/customFieldAccessTable/CustomFieldAccessTable';
import { Abc, LocationOn, Phone } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { Switch } from '@/components/switch/Switch';
import { useAppState } from '@/hooks/useAppState';

const customFields = [
  {
    id: '1',
    icon: <LocationOn />,
    field: 'Address',
    view: true,
    edit: true,
  },
  {
    id: '2',
    icon: <Phone />,
    field: 'Phone number',
    view: true,
    edit: false,
  },
  {
    id: '3',
    icon: <Abc />,
    field: 'Website',
    view: true,
    edit: true,
  },
  {
    id: '4',
    icon: <Phone />,
    field: 'Experience',
    view: true,
    edit: true,
  },
];

export const Sidebar = () => {
  const appState = useAppState();
  return (
    <Box
      sx={(theme) => ({
        width: { xs: '95%', sm: '400px' },
        borderTop: `1px solid ${theme.color.borders.border}`,
        borderLeft: `1px solid ${theme.color.borders.border}`,
        height: '100vh',
        display: appState?.showSidebar ? 'block' : 'none',
        flexShrink: 0,
        zIndex: 1200,
      })}
    >
      <Box
        sx={{
          padding: '24px 20px 12px 20px',
        }}
      >
        <Typography variant="md">Custom field access</Typography>
      </Box>

      <Box sx={{ padding: '0px 20px' }}>
        <CustomFieldAccessTable customFields={customFields} />
      </Box>

      <Box
        sx={(theme) => ({
          padding: '12px 20px',
          borderTop: `1px solid ${theme.color.borders.border}`,
          borderBottom: `1px solid ${theme.color.borders.border}`,
        })}
      >
        <Typography variant="md">Links</Typography>

        <Stack direction="row" justifyContent="space-between" p="12px 0px 6px 0px">
          <Typography variant="bodyMd">General profile settings</Typography>
          <Switch selected={true} getValue={(s) => {}} />
        </Stack>

        <Stack direction="row" justifyContent="space-between" p="6px 0px">
          <Typography variant="bodyMd">Manage payment method</Typography>
          <Switch selected={false} getValue={(s) => {}} />
        </Stack>
      </Box>
    </Box>
  );
};
