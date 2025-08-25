// Consolidated cache name for all dashboard data
const CACHE_NAME = 'dashboard-cache-v1';
const API_CACHE_NAME = 'dashboard-cache-v1'; // Same as CACHE_NAME for simplicity

// Cache configuration
const CACHE_CONFIG = {
  // Cache duration in milliseconds
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  ENDPOINT_SPECIFIC_TTL: {
    '/lite/v1/analytics/auth': 24 * 60 * 60 * 1000, // 24 hours for auth
    '/lite/v1/analytics': 60 * 60 * 1000, // 6 hours for dashboard data
    '/lite/v1/analytics/business': 60 * 60 * 1000, // 6 hours for business data
  },
  // URLs that should never be cached
  BYPASS_CACHE: [
    '/lite/v1/analytics/auth' // Always validate PIN
  ]
};

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching essential resources');
      // Cache static assets if needed
      return cache.addAll([
        // Add essential static resources here
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - intercept network requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle GET requests to our API
  if (event.request.method === 'GET' && url.pathname.startsWith('/lite/v1/')) {
    event.respondWith(handleApiRequest(event.request));
  }
});

// Handle API requests with caching strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const endpoint = url.pathname;
  
  // Check if this endpoint should bypass cache
  if (CACHE_CONFIG.BYPASS_CACHE.includes(endpoint)) {
    return fetch(request);
  }
  
  try {
    const cache = await caches.open(API_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      const cachedData = await cachedResponse.json();
      const cacheTime = cachedData._cacheMetadata?.timestamp || 0;
      const ttl = CACHE_CONFIG.ENDPOINT_SPECIFIC_TTL[endpoint] || CACHE_CONFIG.DEFAULT_TTL;
      const isExpired = Date.now() - cacheTime > ttl;
      
      if (!isExpired) {
        console.log('Service Worker: Serving from cache:', endpoint);
        // Return cached response without metadata
        const responseData = { ...cachedData };
        delete responseData._cacheMetadata;
        return new Response(JSON.stringify(responseData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'X-Cache': 'HIT',
            'X-Cache-Date': new Date(cacheTime).toISOString()
          }
        });
      } else {
        console.log('Service Worker: Cache expired, fetching fresh data:', endpoint);
      }
    }
    
    // Fetch fresh data
    const response = await fetch(request);
    
    if (response.ok) {
      const responseData = await response.clone().json();
      
      // Add cache metadata
      const dataWithMetadata = {
        ...responseData,
        _cacheMetadata: {
          timestamp: Date.now(),
          url: request.url,
          endpoint: endpoint
        }
      };
      
      // Cache the response
      const cacheResponse = new Response(JSON.stringify(dataWithMetadata), {
        status: response.status,
        headers: response.headers
      });
      
      await cache.put(request, cacheResponse);
      console.log('Service Worker: Cached fresh data:', endpoint);
      
      // Return original response
      return response;
    }
    
    // If network fails and we have expired cache, return it anyway
    if (cachedResponse) {
      console.log('Service Worker: Network failed, serving expired cache:', endpoint);
      const cachedData = await cachedResponse.json();
      const responseData = { ...cachedData };
      delete responseData._cacheMetadata;
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'STALE',
          'X-Cache-Date': new Date(cachedData._cacheMetadata?.timestamp || 0).toISOString()
        }
      });
    }
    
    return response;
    
  } catch (error) {
    console.error('Service Worker: Error handling request:', error);
    return new Response(JSON.stringify({ error: 'Service Worker error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Message handler for cache management
self.addEventListener('message', async (event) => {
  const { action, data } = event.data;
  
  switch (action) {
    case 'CLEAR_CACHE':
      await clearCache();
      event.ports[0].postMessage({ success: true });
      break;

    case 'CLEAR_ENDPOINT_CACHE':
      await clearEndpointCache(data.endpoint);
      event.ports[0].postMessage({ success: true });
      break;

    case 'GET_CACHE_STATUS':
      const status = await getCacheStatus();
      event.ports[0].postMessage({ status });
      break;

    default:
      event.ports[0].postMessage({ error: 'Unknown action' });
  }
});

// Clear all cache
async function clearCache() {
  try {
    // Get all cache names
    const cacheNames = await caches.keys();
    console.log('Service Worker: Found caches:', cacheNames);
    
    // Delete all caches
    await Promise.all(
      cacheNames.map(cacheName => {
        console.log('Service Worker: Deleting cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
    
    console.log('Service Worker: All caches cleared');
    return true;
  } catch (error) {
    console.error('Service Worker: Error clearing caches:', error);
    return false;
  }
}

// Clear cache for specific endpoint
async function clearEndpointCache(endpoint) {
  const cache = await caches.open(API_CACHE_NAME);
  const keys = await cache.keys();
  
  for (const key of keys) {
    const url = new URL(key.url);
    if (url.pathname === endpoint) {
      await cache.delete(key);
      console.log('Service Worker: Cleared cache for endpoint:', endpoint);
    }
  }
}

// Get cache status
async function getCacheStatus() {
  const cache = await caches.open(API_CACHE_NAME);
  const keys = await cache.keys();
  const status = [];
  
  for (const key of keys) {
    const response = await cache.match(key);
    if (response) {
      const data = await response.json();
      const metadata = data._cacheMetadata;
      if (metadata) {
        status.push({
          endpoint: new URL(key.url).pathname,
          timestamp: metadata.timestamp,
          age: Date.now() - metadata.timestamp,
          expired: (Date.now() - metadata.timestamp) > (CACHE_CONFIG.ENDPOINT_SPECIFIC_TTL[metadata.endpoint] || CACHE_CONFIG.DEFAULT_TTL)
        });
      }
    }
  }
  
  return status;
} 