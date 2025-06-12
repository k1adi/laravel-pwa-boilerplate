import React, { createContext, useContext, useState, useEffect } from 'react';

const NetworkStatusContext = createContext({
  isOnline: true,
  lastChanged: null
});

export function NetworkStatusProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastChanged, setLastChanged] = useState(null);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
      setLastChanged(new Date());
    }

    function handleOffline() {
      setIsOnline(false);
      setLastChanged(new Date());
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ isOnline, lastChanged }}>
      {children}
    </NetworkStatusContext.Provider>
  );
}

export function useNetworkStatus() {
  return useContext(NetworkStatusContext);
}