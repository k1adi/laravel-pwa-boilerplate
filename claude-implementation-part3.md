# PWA Implementation Guide - Part 3

## 5. Enable Mobile Installation

Let's implement the mobile installation feature to make your PWA installable on mobile devices.

### 5.1 Create Install Prompt Component

Create a new file `resources/js/Components/InstallPrompt.jsx`:

```jsx
// resources/js/Components/InstallPrompt.jsx

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  // Check if the user has already dismissed the prompt
  useEffect(() => {
    const hasUserDismissedPrompt = localStorage.getItem('pwa-install-dismissed');
    if (hasUserDismissedPrompt) {
      setDismissed(true);
    }
  }, []);
  
  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  // Handle the install button click
  const handleInstallClick = () => {
    if (!deferredPrompt) {
      return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt variable
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  };
  
  // Handle the dismiss button click
  const handleDismissClick = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };
  
  if (!showPrompt || dismissed || !deferredPrompt) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">Install App</h3>
        <button 
          onClick={handleDismissClick}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Install this application on your device for quick and easy access.
      </p>
      <div className="flex justify-end">
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          <Download size={16} />
          Install
        </button>
      </div>
    </div>
  );
}
```

### 5.2 Create a Custom Hook for Installation

Create a new file `resources/js/Hook/useInstallPrompt.js`:

```javascript
// resources/js/Hook/useInstallPrompt.js

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
```

### 5.3 Create an Install Button Component

Create a new file `resources/js/Components/InstallButton.jsx`:

```jsx
// resources/js/Components/InstallButton.jsx

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
```

### 5.4 Add the Install Button to Your Layout

Update your layout component to include the install button. For example, you might add it to your navigation bar:

```jsx
import InstallButton from '../Components/InstallButton';

// In your navigation component
<nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex">
        {/* Your logo and navigation links */}
      </div>
      
      <div className="flex items-center">
        {/* Other navigation items */}
        <InstallButton />
      </div>
    </div>
  </div>
</nav>
```

### 5.5 Update App.jsx to Include All PWA Components

Now, let's update the main `app.jsx` file to include all the PWA components we've created:

```jsx
import './bootstrap';
import '../css/app.css';

import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LoadingProvider, useLoading } from './Context/LoadingContext';
import { NetworkStatusProvider } from './Context/NetworkStatusContext';
import { registerServiceWorker } from './pwa/service-worker';

// Register service worker
registerServiceWorker();

const appName = import.meta.env.VITE_APP_NAME || 'PWA Boilerplate';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    function AppWrapper() {
      return (
        <LoadingProvider>
          <NetworkStatusProvider>
            <InnerApp />
          </NetworkStatusProvider>
        </LoadingProvider>
      );
    }

    function InnerApp() {
      const { setLoading } = useLoading();

      useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleFinish = () => setLoading(false);

        Inertia.on('start', handleStart);
        Inertia.on('finish', handleFinish);

        return () => {
          Inertia.off('start', handleStart);
          Inertia.off('finish', handleFinish);
        };
      }, []);
      return <App {...props} />
    }
    root.render(<AppWrapper />);
  },
  progress: false,
});
```

## 6. Testing Your PWA Implementation

### 6.1 Build and Test Locally

Build your application to test the PWA features:

```bash
npm run build
```

Then serve your application:

```bash
php artisan serve
```

### 6.2 Verify PWA Features

1. **Open Chrome DevTools**: Press F12 or right-click and select "Inspect"
2. **Navigate to Application tab**: Check the "Manifest" section to verify your web app manifest
3. **Check Service Workers**: Verify that your service worker is registered and active
4. **Test Offline Mode**: In the Network tab, enable "Offline" mode and refresh the page to test offline functionality
5. **Test Installation**: Look for the install prompt or use your custom install button
6. **Test Caching**: Check the "Cache Storage" section to verify that your assets are being cached

### 6.3 Audit with Lighthouse

Use Chrome's Lighthouse tool to audit your PWA:

1. Open Chrome DevTools
2. Navigate to the "Lighthouse" tab
3. Select "Progressive Web App" category
4. Click "Generate report"

Aim for a high score in the PWA category, which indicates that your implementation follows best practices.

## 7. Deployment Considerations

### 7.1 HTTPS Requirement

PWAs require HTTPS to function properly. Make sure your production environment uses HTTPS.

### 7.2 Cache Headers

Set appropriate cache headers for your assets to work well with the service worker:

```php
// In your .htaccess file or web server configuration
<IfModule mod_headers.c>
    # Cache static assets for 1 year
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    # Don't cache HTML
    <FilesMatch "\.(html|php)$">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
    </FilesMatch>
    
    # Don't cache the service worker
    <FilesMatch "sw\.js$">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
    </FilesMatch>
</IfModule>
```

### 7.3 Service Worker Updates

Ensure your service worker updates properly by implementing a version control mechanism:

```javascript
// In your service worker registration
const SW_VERSION = '1.0.0';
localStorage.setItem('sw-version', SW_VERSION);
```

## Conclusion

You've now implemented a complete PWA solution for your Laravel Inertia React application. Your app can now:

1. Be installed on mobile and desktop devices
2. Work offline using strategic caching
3. Show network status to users
4. Provide a native-like experience

Remember to keep your service worker and caching strategies updated as your application evolves. PWAs are an ongoing commitment to providing the best user experience across all devices and network conditions.
