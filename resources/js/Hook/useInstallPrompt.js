import { useState, useEffect } from 'react';

export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  
  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsAppInstalled(true);
    }
    
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
      setIsInstallable(true);
    };
    
    const handleAppInstalled = () => {
      // Hide the install prompt
      setIsAppInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      // Log the installation to analytics
      console.log('PWA was installed');
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);
  
  const promptToInstall = () => {
    if (!installPrompt) {
      return Promise.reject(
        new Error('The install prompt is not available')
      );
    }
    
    // Show the install prompt
    return installPrompt.prompt()
      .then((result) => {
        // Reset the install prompt
        setInstallPrompt(null);
        setIsInstallable(false);
        return result;
      });
  };
  
  return {
    isAppInstalled,
    isInstallable,
    promptToInstall
  };
}