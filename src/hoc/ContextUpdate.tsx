'use client';

import { useAppState } from '@/hooks/useAppState';
import { ParsedClientProfileUpdatesResponse } from '@/types/clientProfileUpdates';
import { WorkspaceResponse } from '@/types/common';
import { CustomFieldAccessResponse } from '@/types/customFieldAccess';
import { ReactNode, useEffect } from 'react';

interface IContextUpdate {
  children: ReactNode;
  clientProfileUpdates: ParsedClientProfileUpdatesResponse[];
  access: CustomFieldAccessResponse;
  settings: any;
  token: string;
  portalId: string;
  workspace: WorkspaceResponse;
}

export const ContextUpdate = ({
  children,
  clientProfileUpdates,
  access,
  settings,
  token,
  portalId,
  workspace,
}: IContextUpdate) => {
  const appState = useAppState();

  useEffect(() => {
    appState?.setAppState((prev) => ({ ...prev, workspace }));
  }, [workspace]);

  useEffect(() => {
    appState?.setAppState((prev) => ({ ...prev, clientProfileUpdates }));
  }, [clientProfileUpdates]);

  useEffect(() => {
    appState?.setAppState((prev) => ({ ...prev, customFieldAccess: access, mutableCustomFieldAccess: access }));
  }, [access]);

  useEffect(() => {
    appState?.setAppState((prev) => ({ ...prev, settings: settings, mutableSettings: settings }));
  }, [settings]);

  useEffect(() => {
    appState?.setAppState((prev) => ({ ...prev, token: token, portalId: portalId }));
  }, [token, portalId]);

  return children;
};
