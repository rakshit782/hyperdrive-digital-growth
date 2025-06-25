
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import FreeAudit from "./pages/FreeAudit";
import Pricing from "./pages/Pricing";
import AmazonAdvertising from "./pages/AmazonAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import AccountManagement from "./pages/AccountManagement";
import ShopifyIntegration from "./pages/ShopifyIntegration";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import TrackingScriptInjector from "./components/TrackingScriptInjector";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App: React.FC = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <TrackingScriptInjector />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
                <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
                <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
                <Route path="/free-audit" element={<FreeAudit />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
                <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
                <Route path="/meta-advertising" element={<MetaAdvertising />} />
                <Route path="/account-management" element={<AccountManagement />} />
                <Route path="/shopify-integration" element={<ShopifyIntegration />} />
                <Route path="/shopify-development" element={<ShopifyDevelopment />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
