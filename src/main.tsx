
import React from 'react';
import { createRoot } from 'react-dom/client';
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
import('./utils/localStorageDB').then(({ localDB }) => {
  localDB.seedDefaultData().then(() => {
    console.log('Local database initialized as fallback');
  }).catch(error => {
    console.error('Failed to initialize local database:', error);
  });
});

// Optimize rendering
const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

// Use concurrent features for better performance
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/reportWebVitals').then(({ reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
