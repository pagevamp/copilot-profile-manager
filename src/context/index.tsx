'use client';

import { FC, ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';

export interface IAppState {
  showSidebar: boolean;
  searchKeyword: string;
  clientProfileUpdates: any[];
  customFieldAccess: any; //readonly
  mutableCustomFieldAccess: any;
  settings: any; //readonly
  mutableSettings: any;
  token: string;
  portalId: string;
}

export interface IAppContext {
  showSidebar: boolean;
  searchKeyword: string;
  clientProfileUpdates: any[];
  customFieldAccess: any; //readonly
  mutableCustomFieldAccess: any;
  settings: any; //readonly
  mutableSettings: any;
  token: string;
  portalId: string;
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
    clientProfileUpdates: [],
    customFieldAccess: [],
    mutableCustomFieldAccess: [],
    settings: [],
    mutableSettings: [],
    token: '',
    portalId: '',
  });

  return (
    <AppContext.Provider
      value={{
        showSidebar: state.showSidebar,
        searchKeyword: state.searchKeyword,
        clientProfileUpdates: state.clientProfileUpdates,
        customFieldAccess: state.customFieldAccess,
        mutableCustomFieldAccess: state.mutableCustomFieldAccess,
        settings: state.settings,
        mutableSettings: state.mutableSettings,
        token: state.token,
        portalId: state.portalId,
        setAppState: setState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
