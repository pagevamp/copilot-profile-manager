'use client';

import { FooterSave } from '@/components/footerSave/FooterSave';
import { useAppState } from '@/hooks/useAppState';
import { arraysHaveSameElements } from '@/utils/arrayHaveSameElements';
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
        <FooterSave type="1" loading={loading} handleSave={handleSave} handleCancel={handleCancel} />
      )}
    </>
  );
};
