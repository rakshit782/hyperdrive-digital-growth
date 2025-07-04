
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWrapper from "@/components/Auth0ProviderWrapper";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import FreeAudit from "./pages/FreeAudit";
import AmazonAdvertising from "./pages/AmazonAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import GoogleAdvertising from "./pages/GoogleAdvertising";
import AccountManagement from "./pages/AccountManagement";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const App = () => {
  useEffect(() => {
    // Mark app initialization
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark('app-initialized');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/free-audit" element={<FreeAudit />} />
              
              {/* Service Pages */}
              <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
              <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
              <Route path="/meta-advertising" element={<MetaAdvertising />} />
              <Route path="/google-advertising" element={<GoogleAdvertising />} />
              <Route path="/account-management" element={<AccountManagement />} />
              <Route path="/shopify-development" element={<ShopifyDevelopment />} />
              <Route path="/website-development" element={<WebsiteDevelopment />} />
              
              {/* Case Study Pages */}
              <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
              <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
              <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
              
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </Auth0ProviderWrapper>
    </QueryClientProvider>
  );
};

export default App;
