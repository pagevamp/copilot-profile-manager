'use client';

import { CustomFieldAccessTable } from '@/components/customFieldAccessTable/CustomFieldAccessTable';
import { Box, Stack, Typography } from '@mui/material';
import { Switch } from '@/components/switch/Switch';
import { useAppState } from '@/hooks/useAppState';

export const Sidebar = () => {
  const appState = useAppState();

  const handleMutableSettings = (selected: boolean, type: string) => {
    if (!selected) {
      if (type === 'profile_settings') {
        const newSettings = appState?.mutableSettings.filter((el: string) => el !== type);
        appState?.setAppState((prev) => ({ ...prev, mutableSettings: newSettings }));
      }
      if (type === 'payment_method') {
        const newSettings = appState?.mutableSettings.filter((el: string) => el !== type);
        appState?.setAppState((prev) => ({ ...prev, mutableSettings: newSettings }));
      }
    }
    if (selected) {
      if (type === 'profile_settings') {
        appState?.setAppState((prev) => ({
          ...prev,
          mutableSettings: appState?.mutableSettings.includes(type)
            ? appState?.mutableSettings
            : [...appState?.mutableSettings, type],
        }));
      }
      if (type === 'payment_method') {
        appState?.setAppState((prev) => ({
          ...prev,
          mutableSettings: appState?.mutableSettings.includes(type)
            ? appState?.mutableSettings
            : [...appState?.mutableSettings, type],
        }));
      }
    }
  };

  return (
    <Box
      sx={(theme) => ({
        width: { xs: '100%', sm: '400px' },
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
        <CustomFieldAccessTable />
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
          <Switch
            selected={appState?.mutableSettings.includes('profile_settings')}
            getValue={(selected) => {
              handleMutableSettings(selected, 'profile_settings');
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" p="6px 0px">
          <Typography variant="bodyMd">Manage payment method</Typography>
          <Switch
            selected={appState?.mutableSettings.includes('payment_method')}
            getValue={(selected) => {
              handleMutableSettings(selected, 'payment_method');
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};
