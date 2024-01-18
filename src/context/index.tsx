'use client';

import { FC, ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';

export interface IAppState {
  showSidebar: boolean;
}

export interface IAppContext {
  showSidebar: boolean;
  setAppState: Dispatch<SetStateAction<IAppState>>;
}

interface IAppCoreProvider {
  children: ReactNode;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {
  const [state, setState] = useState<IAppState>({
    showSidebar: false,
  });

  return (
    <AppContext.Provider
      value={{
        showSidebar: state.showSidebar,
        setAppState: setState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
