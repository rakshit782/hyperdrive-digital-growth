
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { performanceOptimizer } from './utils/performanceOptimizer';
import { logMigrationStatus } from './utils/migrationStatus';

// Log migration status
logMigrationStatus();

// Initialize local database fallback for offline mode
import('./utils/localStorageDB')
  .then(({ localDB }) => {
    return localDB.seedDefaultData();
  })
  .then(() => {
    console.log('Local database initialized as fallback');
  })
  .catch(error => {
    console.error('Failed to initialize local database:', error);
    // Don't block app loading if local DB fails
  });

// Optimize rendering
const container = document.getElementById("root");
if (!container) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Failed to load application</h1><p>Please refresh the page</p></div>';
  throw new Error('Failed to find the root element');
}

const prerendered = container.hasChildNodes();

// Same startup path as before. Skip image mutations when the server already
// rendered the body, so hydration sees the original markup.
performanceOptimizer.init({ skipImageMutations: prerendered });
performanceOptimizer.registerServiceWorker();

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Prerendered routes ship markup inside #root. Client-only routes use an empty shell.
if (prerendered) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// Report web vitals in development
if (import.meta.env.DEV) {
  import('./utils/reportWebVitals').then(({ reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
