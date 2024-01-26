'use client';

import useWindowWidth from '@/hooks/useWindowWidth';
import { ReactNode } from 'react';

export const SidebarDecider = ({ children }: { children: ReactNode }) => {
  const windowWidth = useWindowWidth();

  if (windowWidth) {
    if (windowWidth >= 600) return children;
  }

  return null;
};
