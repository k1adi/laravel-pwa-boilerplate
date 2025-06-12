import React from 'react';
import { useInstallPrompt } from '../Hook/useInstallPrompt';
import { Download } from 'lucide-react';

export default function InstallButton() {
  const { isAppInstalled, isInstallable, promptToInstall } = useInstallPrompt();
  
  const handleInstallClick = () => {
    promptToInstall()
      .then((outcome) => {
        console.log(`User ${outcome.outcome} the install prompt`);
      })
      .catch((error) => {
        console.error('Error installing app:', error);
      });
  };
  
  if (isAppInstalled || !isInstallable) {
    return null;
  }
  
  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
    >
      <Download size={16} />
      Install App
    </button>
  );
}