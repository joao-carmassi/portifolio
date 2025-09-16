/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface Props {
  children: ReactNode;
  locale: string;
  locales: { locale: string; name: string }[];
}

interface ContextType {
  locale: string;
  locales: { locale: string; name: string }[];
  getMessage: (component: string, key: string) => string;
}

const MessagesContext = createContext<ContextType | null>(null);

const MessagesProvider = ({ children, locale, locales }: Props) => {
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    import(`../../messages/${locale}.json`).then((mod) =>
      setMessages(mod.default)
    );
  }, [locale]);

  const getMessage = (component: string, text: string) => {
    return messages[component]?.[text] || text;
  };

  return (
    <MessagesContext.Provider value={{ locale, locales, getMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

type MessageFunc = (text: string) => any;

export const useMessages = (component: string): MessageFunc => {
  const context = useContext(MessagesContext);
  if (!context)
    throw new Error('useMessages must be used within MessagesProvider');

  const { getMessage } = context;
  return (key: string) => getMessage(component, key);
};

export const useLocales = () => {
  const context = useContext(MessagesContext);
  if (!context)
    throw new Error('useMessages must be used within MessagesProvider');

  const { locales } = context;
  return locales;
};

export default MessagesProvider;
