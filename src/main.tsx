
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { performanceOptimizer } from './utils/performanceOptimizer';
import { logMigrationStatus } from './utils/migrationStatus';

// Initialize performance optimizations
performanceOptimizer.init();
performanceOptimizer.registerServiceWorker();

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

const root = createRoot(container);

// Use concurrent features for better performance
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Report web vitals in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/reportWebVitals').then(({ reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
