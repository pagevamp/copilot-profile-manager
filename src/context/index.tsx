'use client';

import { FC, ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';

export interface IAppState {
  showSidebar: boolean;
  searchKeyword: string;
}

export interface IAppContext {
  showSidebar: boolean;
  searchKeyword: string;
  setAppState: Dispatch<SetStateAction<IAppState>>;
}

interface IAppCoreProvider {
  children: ReactNode;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider: FC<IAppCoreProvider> = ({ children }) => {
  const [state, setState] = useState<IAppState>({
    showSidebar: false,
    searchKeyword: '',
  });

  return (
    <AppContext.Provider
      value={{
        showSidebar: state.showSidebar,
        searchKeyword: state.searchKeyword,
        setAppState: setState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
