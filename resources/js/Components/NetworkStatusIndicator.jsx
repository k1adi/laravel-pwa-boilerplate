import React, { useState, useEffect } from 'react';
import { useNetworkStatus } from '../Context/NetworkStatusContext';
import { WifiOff, Wifi } from 'lucide-react';

export default function NetworkStatusIndicator() {
  const { isOnline, lastChanged } = useNetworkStatus();
  const [visible, setVisible] = useState(false);
  
  // Show indicator when status changes, hide after 5 seconds
  useEffect(() => {
    if (lastChanged) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [lastChanged]);
  
  // Always show when offline
  useEffect(() => {
    if (!isOnline) {
      setVisible(true);
    }
  }, [isOnline]);
  
  if (!visible && isOnline) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
      isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      {isOnline ? (
        <>
          <Wifi size={18} />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff size={18} />
          <span>Offline</span>
        </>
      )}
    </div>
  );
}