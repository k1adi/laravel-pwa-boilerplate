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