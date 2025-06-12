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
    <span
      onClick={handleInstallClick}
      className='nav__link' >
        <Download/> Install App
    </span>
  );
}