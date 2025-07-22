'use client';

import { createContext, ReactNode, useContext } from 'react';

export interface IContainers {
  nome: string;
  id: string;
}

interface contextTypes {
  containers: IContainers[];
}

const AppContext = createContext<contextTypes | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const containers = [
    {
      nome: 'About',
      id: 'containeAbout',
    },
    {
      nome: 'Github',
      id: 'containerGithub',
    },
    {
      nome: 'Map',
      id: 'containerMap',
    },
  ];

  return (
    <AppContext.Provider value={{ containers }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error('useAppContext must be used within an AppProvider');

  return context;
};
