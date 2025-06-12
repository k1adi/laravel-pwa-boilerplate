import './bootstrap';
import '../css/app.css';

import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { NetworkStatusProvider } from './Context/NetworkStatusContext';
import { LoadingProvider, useLoading } from './Context/LoadingContext';
import { registerServiceWorker } from './sw';

registerServiceWorker();
const appName = import.meta.env.VITE_APP_NAME || 'Laravel PWA';

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
