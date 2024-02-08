'use client';

import { FooterSave } from '@/components/footerSave/FooterSave';
import { useAppState } from '@/hooks/useAppState';
import { arraysHaveSameElements } from '@/utils/arrayHaveSameElements';
import { useState } from 'react';

interface Prop {
  handleSave(customFieldAccessPayload: string, settingsPayload: string, token: string, portalId: string): Promise<void>;
}

export const Footer = ({ handleSave }: Prop) => {
  const appState = useAppState();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    appState?.setAppState((prev) => ({ ...prev, mutableSettings: appState?.settings }));
    appState?.setAppState((prev) => ({ ...prev, mutableCustomFieldAccess: appState?.customFieldAccess }));
  };

  const initiateSave = async () => {
    let accesses = appState?.mutableCustomFieldAccess.map(({ id, permission }: any) => ({
      customFieldId: id,
      permissions: permission,
    }));
    setLoading(true);
    try {
      await handleSave(
        JSON.stringify({
          token: appState?.token as string,
          portalId: appState?.portalId as string,
          accesses: accesses,
        }),
        JSON.stringify({
          token: appState?.token as string,
          portalId: appState?.portalId as string,
          profileLinks: appState?.mutableSettings,
        }),
        appState?.token as string,
        appState?.portalId as string,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {arraysHaveSameElements(appState?.mutableSettings, appState?.settings) &&
      JSON.stringify(appState?.customFieldAccess) === JSON.stringify(appState?.mutableCustomFieldAccess) ? null : (
        <FooterSave type="1" loading={loading} handleSave={initiateSave} handleCancel={handleCancel} />
      )}
    </>
  );
};
