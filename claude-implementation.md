# PWA Implementation Guide for Laravel Inertia React Application

This guide outlines the steps to implement Progressive Web App (PWA) features in your Laravel application with Inertia React. The implementation includes asset generation, service worker setup, caching strategies, offline/online status detection, and mobile installation capabilities.

## Table of Contents

1. [Generate Manifest and Favicons](#1-generate-manifest-and-favicons)
2. [Implement PWA in Laravel Application](#2-implement-pwa-in-laravel-application)
3. [Implement Caching Strategies](#3-implement-caching-strategies)
4. [Create Online/Offline Status Component](#4-create-onlineoffline-status-component)
5. [Enable Mobile Installation](#5-enable-mobile-installation)

## 1. Generate Manifest and Favicons

We'll use the [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) library to generate all necessary icons and the manifest file.

### 1.1 Install PWA Asset Generator

```bash
npm install --save-dev pwa-asset-generator
```

### 1.2 Prepare Source Image

Create a high-quality source image (at least 1024x1024px) for your application logo and save it in the `resources/assets` directory.

### 1.3 Generate Assets

Create a script to generate all the necessary PWA assets:

```bash
# Create a script file
touch generate-pwa-assets.js
```

Add the following content to the script:

```javascript
// generate-pwa-assets.js
const pwaAssetGenerator = require('pwa-asset-generator');
const path = require('path');

(async () => {
  const sourceImage = path.join(__dirname, 'resources/assets/pwa-logo.png');
  const outputFolder = path.join(__dirname, 'public');
  
  try {
    const result = await pwaAssetGenerator.generateImages(
      sourceImage,
      outputFolder,
      {
        scrape: false,
        background: '#ffffff',
        splashOnly: false,
        portraitOnly: false,
        log: true,
        manifest: './public/manifest.json',
        index: './resources/views/app.blade.php',
        favicon: true,
        mstile: true,
        iconOnly: false
      }
    );
    
    console.log('PWA assets generated successfully!');
  } catch (error) {
    console.error('Error generating PWA assets:', error);
  }
})();
```

### 1.4 Create Basic Manifest File

Before running the generator, create a basic manifest file:

```bash
touch public/manifest.json
```

Add the following content to the manifest file:

```json
{
  "name": "Laravel PWA Boilerplate",
  "short_name": "PWA App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait",
  "icons": []
}
```

### 1.5 Run the Asset Generator

```bash
node generate-pwa-assets.js
```

This will generate all the necessary icons and update your manifest file with the correct icon paths.

## 2. Implement PWA in Laravel Application

### 2.1 Install Required Dependencies

```bash
npm install --save-dev vite-plugin-pwa workbox-window
```

### 2.2 Update Vite Configuration

Update your `vite.config.js` file to include the PWA plugin:

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
                name: 'Laravel PWA Boilerplate',
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

### 2.3 Update the Blade Template

Update your `resources/views/app.blade.php` file to include the necessary PWA meta tags:

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#000000">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- PWA Meta Tags -->
        <link rel="manifest" href="/manifest.json">
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'Laravel') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
```

### 2.4 Create Service Worker Registration

Create a new file `resources/js/service-worker.js` to register the service worker:

```javascript
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        const updateSW = registerSW({
            onNeedRefresh() {
                // Show a notification to the user that there's an update available
                console.log('New content is available; please refresh.');
            },
            onOfflineReady() {
                // Show a notification that the app is ready for offline use
                console.log('App is ready for offline use.');
            },
        });
    }
}
```

### 2.5 Update the Main App Entry Point

Update your `resources/js/app.jsx` file to register the service worker:

```javascript
import './bootstrap';
import '../css/app.css';

import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LoadingProvider, useLoading } from './Context/LoadingContext';
import { registerServiceWorker } from './service-worker';

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
          <InnerApp />
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
