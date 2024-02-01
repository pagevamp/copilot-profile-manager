'use client';

import { VariantButton1, VariantButton2 } from '@/components/styled/VariantButton';
import { useAppState } from '@/hooks/useAppState';
import { arraysHaveSameElements } from '@/utils/arrayHaveSameElements';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const Footer = () => {
  const appState = useAppState();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    appState?.setAppState((prev) => ({ ...prev, mutableSettings: appState?.settings }));
    appState?.setAppState((prev) => ({ ...prev, mutableCustomFieldAccess: appState?.customFieldAccess }));
  };

  const handleSave = async () => {
    setLoading(true);
    let accesses = appState?.mutableCustomFieldAccess.map(({ id, permission }: any) => ({
      customFieldId: id,
      permissions: permission,
    }));
    await fetch(`/api/custom-field-access`, {
      method: 'PUT',
      body: JSON.stringify({
        token: appState?.token,
        portalId: appState?.portalId,
        accesses: accesses,
      }),
    });
    await fetch(`/api/settings`, {
      method: 'PUT',
      body: JSON.stringify({
        token: appState?.token,
        portalId: appState?.portalId,
        profileLinks: appState?.mutableSettings,
      }),
    });
    const settingsRes = await fetch(`/api/settings?token=${appState?.token}&portalId=${appState?.portalId}`);
    const settings = await settingsRes.json();
    const customFieldAccessRes = await fetch(
      `/api/custom-field-access?token=${appState?.token}&portalId=${appState?.portalId}`,
    );
    const customFieldAccess = await customFieldAccessRes.json();
    appState?.setAppState((prev) => ({
      ...prev,
      settings: settings.data.profileLinks,
      mutableSettings: settings.data.profileLinks,
    }));
    appState?.setAppState((prev) => ({
      ...prev,
      customFieldAccess: customFieldAccess.data,
      mutableCustomFieldAccess: customFieldAccess.data,
    }));
    setLoading(false);
  };

  return (
    <>
      {arraysHaveSameElements(appState?.mutableSettings, appState?.settings) &&
      JSON.stringify(appState?.customFieldAccess) === JSON.stringify(appState?.mutableCustomFieldAccess) ? null : (
        <Stack
          sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            borderTop: (theme) => `1px solid ${theme.color.borders.border}`,
            padding: '16px 24px',
            background: '#fff',
            alignItems: 'flex-end',
            zIndex: 9999,
          }}
        >
          <Stack direction="row" columnGap={5}>
            <VariantButton1 onClick={handleCancel}>
              <Typography variant="md">Cancel</Typography>
            </VariantButton1>
            <VariantButton2 onClick={handleSave}>
              {loading ? (
                <Typography
                  variant="md"
                  sx={{
                    color: '#fff',
                  }}
                >
                  Saving...
                </Typography>
              ) : (
                <Typography
                  variant="md"
                  sx={{
                    color: '#fff',
                  }}
                >
                  Save changes
                </Typography>
              )}
            </VariantButton2>
          </Stack>
        </Stack>
      )}
    </>
  );
};
