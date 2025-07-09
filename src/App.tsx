import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/ErrorFallback'
import { TooltipProvider } from "@/components/ui/tooltip"
import PerformanceOptimizer from '@/components/PerformanceOptimizer'
import ModernLayout from '@/layouts/ModernLayout'
import PricingPage from '@/pages/PricingPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import CaseStudiesPage from '@/pages/CaseStudiesPage'
import FreeAuditPage from '@/pages/FreeAuditPage'
import ServicesPage from '@/pages/ServicesPage'
import AmazonAdvertisingPage from '@/pages/AmazonAdvertisingPage'
import WalmartAdvertisingPage from '@/pages/WalmartAdvertisingPage'
import GoogleAdvertisingPage from '@/pages/GoogleAdvertisingPage'
import MetaAdvertisingPage from '@/pages/MetaAdvertisingPage'
import WebsiteDevelopmentPage from '@/pages/WebsiteDevelopmentPage'
import AccountManagementPage from '@/pages/AccountManagementPage'
import ShopifyDevelopmentPage from '@/pages/ShopifyDevelopmentPage'
import ShopifyIntegrationPage from '@/pages/ShopifyIntegrationPage'
import Dashboard from '@/pages/Dashboard'
import NavigationOptimizer from "@/components/NavigationOptimizer";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <NavigationOptimizer />
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
              console.error('ErrorBoundary caught an error:', error, info);
            }}
          >
            <PerformanceOptimizer />
            <Routes>
              <Route path="/" element={<ModernLayout />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/free-audit" element={<FreeAuditPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/amazon-advertising" element={<AmazonAdvertisingPage />} />
              <Route path="/walmart-advertising" element={<WalmartAdvertisingPage />} />
              <Route path="/google-advertising" element={<GoogleAdvertisingPage />} />
              <Route path="/meta-advertising" element={<MetaAdvertisingPage />} />
              <Route path="/website-development" element={<WebsiteDevelopmentPage />} />
              <Route path="/account-management" element={<AccountManagementPage />} />
              <Route path="/shopify-development" element={<ShopifyDevelopmentPage />} />
              <Route path="/shopify-integration" element={<ShopifyIntegrationPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
