// Service Worker utility for managing cache and registration
export interface CacheStatus {
  endpoint: string;
  timestamp: number;
  age: number;
  expired: boolean;
}

export interface ServiceWorkerMessage {
  action: 'CLEAR_CACHE' | 'CLEAR_ENDPOINT_CACHE' | 'GET_CACHE_STATUS';
  data?: {
    endpoint?: string;
  };
}

export class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isRegistered: boolean = false;

  // Register service worker
  async register(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      this.isRegistered = true;
      console.log('Service Worker registered successfully');

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found');
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from Service Worker:', event.data);
      });

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  // Unregister service worker
  async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      await this.registration.unregister();
      this.isRegistered = false;
      console.log('Service Worker unregistered');
      return true;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }

  // Send message to service worker
  private async sendMessage(message: ServiceWorkerMessage): Promise<any> {
    if (!this.isRegistered || !navigator.serviceWorker.controller) {
      throw new Error('Service Worker not available');
    }

    const controller = navigator.serviceWorker.controller;
    if (!controller) {
      throw new Error('Service Worker controller not available');
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else {
          resolve(event.data);
        }
      };

      controller.postMessage(message, [messageChannel.port2]);
    });
  }

  // Clear all cache
  async clearCache(): Promise<boolean> {
    try {
      if (this.isServiceWorkerRegistered()) {
        await this.sendMessage({ action: 'CLEAR_CACHE' });
      }

      // Also clear caches directly via browser API as fallback
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  }

  // Clear cache for specific endpoint
  async clearEndpointCache(endpoint: string): Promise<boolean> {
    try {
      await this.sendMessage({ 
        action: 'CLEAR_ENDPOINT_CACHE', 
        data: { endpoint } 
      });
      console.log(`Cache cleared for endpoint: ${endpoint}`);
      return true;
    } catch (error) {
      console.error(`Failed to clear cache for endpoint ${endpoint}:`, error);
      return false;
    }
  }

  // Clear dashboard-specific cache endpoints
  async clearDashboardCache(): Promise<boolean> {
    try {
      // Clear the main analytics endpoint
      await this.clearEndpointCache('/lite/v1/analytics');
      
      // Clear any business-specific endpoints if they exist
      await this.clearEndpointCache('/lite/v1/analytics/business');
      
      console.log('Dashboard cache cleared');
      return true;
    } catch (error) {
      console.error('Failed to clear dashboard cache:', error);
      return false;
    }
  }

  // Get cache status
  async getCacheStatus(): Promise<CacheStatus[]> {
    try {
      const response = await this.sendMessage({ action: 'GET_CACHE_STATUS' });
      return response.status || [];
    } catch (error) {
      console.error('Failed to get cache status:', error);
      return [];
    }
  }

  // Check if service worker is registered
  isServiceWorkerRegistered(): boolean {
    console.log('isServiceWorkerRegistered', this.isRegistered);
    return this.isRegistered;
  }

  // Force update service worker
  async forceUpdate(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      await this.registration.update();
      console.log('Service Worker update forced');
      return true;
    } catch (error) {
      console.error('Failed to force Service Worker update:', error);
      return false;
    }
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Global function for manual cache clearing (for debugging)
(window as any).clearAllCaches = async () => {
  try {
    console.log('Manual cache clearing initiated...');
    
    // Clear via service worker manager
    const result = await serviceWorkerManager.clearCache();
    console.log('Service worker manager result:', result);
    
    // Clear browser storage
    localStorage.clear();
    sessionStorage.clear();
    console.log('Browser storage cleared');
    
    // Clear all cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    console.log('Cookies cleared');
    
    console.log('All caches and storage cleared manually');
    return true;
  } catch (error) {
    console.error('Error in manual cache clearing:', error);
    return false;
  }
};

// Helper function to format cache age
export const formatCacheAge = (age: number): string => {
  if (age < 60 * 1000) {
    return `${Math.round(age / 1000)}s`;
  } else if (age < 60 * 60 * 1000) {
    return `${Math.round(age / (60 * 1000))}m`;
  } else {
    return `${Math.round(age / (60 * 60 * 1000))}h`;
  }
};

// Helper function to check if cache is available
export const isCacheAvailable = (): boolean => {
  return 'caches' in window && 'serviceWorker' in navigator;
}; 