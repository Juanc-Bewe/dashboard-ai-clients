import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { serviceWorkerManager } from './utils/serviceWorkerUtils';

// Register service worker when app starts
// Enable for both development and production to test caching
serviceWorkerManager.register().then((success) => {
  if (success) {
    console.log('✅ Service Worker registered successfully');
    console.log('🚀 API calls will now be cached automatically');
  } else {
    console.log('❌ Service Worker registration failed');
  }
}).catch((error) => {
  console.error('Service Worker registration error:', error);
});

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
