'use client';

import { useAppState } from '@/hooks/useAppState';
import useWindowWidth from '@/hooks/useWindowWidth';
import { ReactNode, useEffect } from 'react';

export const ToggleDecider = ({ children }: { children: ReactNode }) => {
  const windowWidth = useWindowWidth();
  const appState = useAppState();

  useEffect(() => {
    if (windowWidth <= 600) {
      appState?.setAppState((prev) => ({ ...prev, showSidebar: false }));
    }
  }, [windowWidth]);

  return children;
};
