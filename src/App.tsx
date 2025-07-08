import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import FreeAudit from "./pages/FreeAudit";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import AmazonAdvertising from "./pages/AmazonAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import GoogleAdvertising from "./pages/GoogleAdvertising";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SEOManager from "./components/SEOManager";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import EmailAutomationManager from "./components/EmailAutomationManager";
import ScrollToTop from "./components/ScrollToTop";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import ShopifyIntegration from "./pages/ShopifyIntegration";
import AccountManagement from "./pages/AccountManagement";
import { performanceMonitor } from "./utils/performanceMonitor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.measureWebVitals();
    performanceMonitor.startMeasurement('app-initialization');
    
    // App initialization complete
    setTimeout(() => {
      performanceMonitor.endMeasurement('app-initialization');
    }, 100);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PerformanceOptimizer />
          <SEOManager />
          <AdvancedAnalytics />
          <EmailAutomationManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/free-audit" element={<FreeAudit />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
            <Route path="/meta-advertising" element={<MetaAdvertising />} />
            <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
            <Route path="/google-advertising" element={<GoogleAdvertising />} />
            <Route path="/website-development" element={<WebsiteDevelopment />} />
            <Route path="/shopify-development" element={<ShopifyDevelopment />} />
            <Route path="/shopify-integration" element={<ShopifyIntegration />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
