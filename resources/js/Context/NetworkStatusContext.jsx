import React, { createContext, useContext, useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

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

    // Simple error handler for Inertia navigation
    const handleError = (event) => {
      // If we get an error during navigation and we're offline, redirect to offline page
      if (!navigator.onLine) {
        // Prevent the default error handling
        event.preventDefault();
        
        // Navigate to the offline page
        Inertia.visit('/offline', { preserveScroll: true });
      }
    };

    document.addEventListener('inertia:error', handleError);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('inertia:error', handleError);
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

export { NetworkStatusContext };