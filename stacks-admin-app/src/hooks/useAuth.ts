import { useCallback, useState } from 'react';
import { showConnect } from '@stacks/connect';
import { useStacksAuth } from '../context/StackAuthContext';
import { APP_NAME, APP_ICON } from '../config/constants';

export function useAuth() {
  const { userSession } = useStacksAuth();
  const [isConnected, setIsConnected] = useState(userSession.isUserSignedIn());

  const handleConnect = useCallback(() => {
    showConnect({
      appDetails: {
        name: APP_NAME,
        icon: APP_ICON,
      },
      redirectTo: '/',
      onFinish: () => {
        setIsConnected(true);
      },
      userSession,
    });
  }, [userSession]);

  const handleDisconnect = useCallback(() => {
    userSession.signUserOut();
    setIsConnected(false);
  }, [userSession]);

  return {
    isConnected,
    handleConnect,
    handleDisconnect,
    userData: isConnected ? userSession.loadUserData() : null,
  };
}