import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/resend': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/resend/, ''),
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: isSsrBuild
    ? undefined
    : {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
          output: {
            manualChunks(id) {
              const normalized = id.replace(/\\/g, '/');
              if (normalized.includes('/node_modules/')) {
                if (
                  normalized.includes('/react/') ||
                  normalized.includes('/react-dom/') ||
                  normalized.includes('/react-router-dom/') ||
                  normalized.includes('/react-helmet-async/')
                ) {
                  return 'vendor-react';
                }
                if (normalized.includes('/@radix-ui/') || normalized.includes('/lucide-react/')) {
                  return 'vendor-ui';
                }
                if (normalized.includes('/@tanstack/') || normalized.includes('/@neondatabase/')) {
                  return 'vendor-core';
                }
              }
            },
          },
        },
      },
  ssr: {
    // CJS packages whose named exports Node cannot import from the SSR bundle.
    noExternal: ['react-helmet-async'],
  },
  define: {
    global: 'globalThis',
  },
}));
