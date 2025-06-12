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
    },

    // Inertia pages
    inertiaPages: {
      strategy: 'NetworkFirst',
      cacheName: 'inertia-pages-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 10 * 60, // 10 minutes
      },
      networkTimeoutSeconds: 10,
      cacheableResponse: {
        statuses: [0, 200]
      }
    },
  };