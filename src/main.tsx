
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { localDB } from './utils/localStorageDB';

// Initialize local database and seed default data
localDB.seedDefaultData().then(() => {
  console.log('Local database initialized');
}).catch(error => {
  console.error('Failed to initialize local database:', error);
});

// Optimize rendering
const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(<App />);
