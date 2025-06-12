# PWA Implementation Guide - Part 2

## 3. Implement Caching Strategies

Let's implement effective caching strategies for different types of assets and API requests.

### 3.1 Configure Workbox Caching Strategies

The Workbox library (included with vite-plugin-pwa) provides powerful caching strategies. We've already set up basic caching in the Vite config, but let's create a more comprehensive caching strategy.

Create a new file `resources/js/pwa/caching-strategies.js`:

```javascript
// resources/js/pwa/caching-strategies.js

// This file defines the caching strategies to be used in the service worker
export const cachingStrategies = {
  // For static assets (JS, CSS, images)
  assets: {
    strategy: 'CacheFirst',
    cacheName: 'static-assets',
    expiration: {
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }
  },
  
  // For API requests
  api: {
    strategy: 'NetworkFirst',
    cacheName: 'api-cache',
    expiration: {
      maxEntries: 50,
      maxAgeSeconds: 5 * 60, // 5 minutes
    },
    networkTimeoutSeconds: 10
  },
  
  // For pages
  pages: {
    strategy: 'NetworkFirst',
    cacheName: 'pages-cache',
    expiration: {
      maxEntries: 30,
      maxAgeSeconds: 24 * 60 * 60, // 1 day
    }
  },
  
  // For fonts
  fonts: {
    strategy: 'CacheFirst',
    cacheName: 'font-cache',
    expiration: {
      maxEntries: 10,
      maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
    }
  },
  
  // For images
  images: {
    strategy: 'CacheFirst',
    cacheName: 'image-cache',
    expiration: {
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }
  }
};
```

### 3.2 Update Vite PWA Configuration

Update the `vite.config.js` file to use these caching strategies:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
            manifest: {
                name: 'Laravel PWA',
                short_name: 'PWA App',
                description: 'Laravel PWA Application with Inertia React',
                theme_color: '#000000',
                icons: [
                    {
                        src: 'icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
                runtimeCaching: [
                    // API requests
                    {
                        urlPattern: ({ url }) => url.pathname.startsWith('/api'),
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 5 * 60, // 5 minutes
                            },
                            networkTimeoutSeconds: 10,
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // HTML pages
                    {
                        urlPattern: ({ request }) => request.destination === 'document',
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'pages-cache',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 24 * 60 * 60, // 1 day
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // JavaScript and CSS
                    {
                        urlPattern: ({ request }) => 
                            request.destination === 'script' || 
                            request.destination === 'style',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'static-assets',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // Images
                    {
                        urlPattern: ({ request }) => request.destination === 'image',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // Fonts
                    {
                        urlPattern: ({ request }) => request.destination === 'font',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'font-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // Google Fonts
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            },
            devOptions: {
                enabled: true,
                type: 'module',
            }
        })
    ],
});
```

### 3.3 Create a Custom Fetch Handler for API Requests

Create a new file `resources/js/pwa/api-cache.js` to handle API requests with offline support:

```javascript
// resources/js/pwa/api-cache.js

export class ApiCache {
  static async fetch(url, options = {}) {
    try {
      // Try to fetch from network first
      const response = await fetch(url, options);
      
      // If successful, clone the response and store it in the cache
      if (response.ok) {
        const responseClone = response.clone();
        const cache = await caches.open('api-cache');
        cache.put(url, responseClone);
        return response;
      }
      
      throw new Error('Network response was not ok');
    } catch (error) {
      console.log('Fetch failed, falling back to cache', error);
      
      // If network request fails, try to get from cache
      const cachedResponse = await caches.match(url);
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // If not in cache, return a custom offline response
      return new Response(
        JSON.stringify({
          error: 'You are offline and the requested resource is not cached.',
          offline: true,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 503,
          statusText: 'Service Unavailable'
        }
      );
    }
  }
}
```

## 4. Create Online/Offline Status Component

Let's create a floating component to display the network status.

### 4.1 Create Network Status Context

Create a new file `resources/js/Context/NetworkStatusContext.jsx`:

```jsx
// resources/js/Context/NetworkStatusContext.jsx

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
```

### 4.2 Create Network Status Indicator Component

Create a new file `resources/js/Components/NetworkStatusIndicator.jsx`:

```jsx
// resources/js/Components/NetworkStatusIndicator.jsx

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
```

### 4.3 Update App Layout to Include Network Status

Update your main layout component to include the network status provider and indicator. For example, if you have a `resources/js/Layouts/AppLayout.jsx` file:

```jsx
import React from 'react';
import { NetworkStatusProvider } from '../Context/NetworkStatusContext';
import NetworkStatusIndicator from '../Components/NetworkStatusIndicator';
// Import other components...

export default function AppLayout({ children }) {
  return (
    <NetworkStatusProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Your existing layout components */}
        
        {/* Network Status Indicator */}
        <NetworkStatusIndicator />
        
        {/* Main content */}
        <main>{children}</main>
      </div>
    </NetworkStatusProvider>
  );
}
```
