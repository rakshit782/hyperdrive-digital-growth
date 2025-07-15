
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import ServicesPage from '@/pages/ServicesPage';
import CaseStudies from '@/pages/CaseStudies';
import Blog from '@/pages/Blog';
import BlogArticle from '@/pages/BlogArticle';
import PricingPage from '@/pages/PricingPage';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import ServicePage from '@/pages/ServicePage';
import AmazonAdvertisingPage from '@/pages/AmazonAdvertisingPage';
import MetaAdvertisingPage from '@/pages/MetaAdvertisingPage';
import GoogleAdvertisingPage from '@/pages/GoogleAdvertisingPage';
import WalmartAdvertisingPage from '@/pages/WalmartAdvertisingPage';
import ShopifyDevelopmentPage from '@/pages/ShopifyDevelopmentPage';
import WebsiteDevelopmentPage from '@/pages/WebsiteDevelopmentPage';
import ShopifyIntegrationPage from '@/pages/ShopifyIntegrationPage';
import AccountManagementPage from '@/pages/AccountManagementPage';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from "@/components/ui/tooltip"
import TrackingScriptInjector from '@/components/TrackingScriptInjector';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <TrackingScriptInjector />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service/:slug" element={<ServicePage />} />

            {/* Unified Service Pages */}
            <Route path="/amazon-advertising" element={<AmazonAdvertisingPage />} />
            <Route path="/meta-advertising" element={<MetaAdvertisingPage />} />
            <Route path="/google-advertising" element={<GoogleAdvertisingPage />} />
            <Route path="/walmart-advertising" element={<WalmartAdvertisingPage />} />
            <Route path="/shopify-development" element={<ShopifyDevelopmentPage />} />
            <Route path="/website-development" element={<WebsiteDevelopmentPage />} />
            <Route path="/shopify-integration" element={<ShopifyIntegrationPage />} />
            <Route path="/account-management" element={<AccountManagementPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
