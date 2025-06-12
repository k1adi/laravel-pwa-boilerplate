import React, { useContext } from 'react';
import { NetworkStatusContext } from '@/Context/NetworkStatusContext';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const { isOnline } = useContext(NetworkStatusContext);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-500 text-white py-2 px-4 z-50 flex items-center justify-center gap-2">
      <WifiOff size={16} />
      <span>You're offline. Viewing cached content.</span>
    </div>
  );
}
