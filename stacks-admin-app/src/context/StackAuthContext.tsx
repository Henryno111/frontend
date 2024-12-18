import { createContext, useContext, ReactNode } from 'react';
import { UserSession } from '@stacks/connect';
import { appConfig } from '../config/stacksConfig';

interface StacksAuthContextType {
  userSession: UserSession;
}

const StacksAuthContext = createContext<StacksAuthContextType | undefined>(undefined);

export function StacksAuthProvider({ children }: { children: ReactNode }) {
  const userSession = new UserSession({ appConfig });

  return (
    <StacksAuthContext.Provider value={{ userSession }}>
      {children}
    </StacksAuthContext.Provider>
  );
}

export function useStacksAuth() {
  const context = useContext(StacksAuthContext);
  if (context === undefined) {
    throw new Error('useStacksAuth must be used within a StacksAuthProvider');
  }
  return context;
}