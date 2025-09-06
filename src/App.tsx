
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Direct imports for instant loading - no lazy loading
import About from "./pages/About";
import Services from "./pages/ServicesPage";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import FreeAudit from "./pages/FreeAudit";
import Blog from "./pages/Blog";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

// Service pages
import AmazonAdvertising from "./pages/AmazonAdvertising";
import GoogleAdvertising from "./pages/GoogleAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import AccountManagement from "./pages/AccountManagement";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import ShopifyIntegration from "./pages/ShopifyIntegration";

// Case study pages
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";

// Policy pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            
            {/* Service Detail Pages */}
            <Route path="/services/amazon-advertising" element={<AmazonAdvertising />} />
            <Route path="/services/google-advertising" element={<GoogleAdvertising />} />
            <Route path="/services/meta-advertising" element={<MetaAdvertising />} />
            <Route path="/services/walmart-advertising" element={<WalmartAdvertising />} />
            <Route path="/services/account-management" element={<AccountManagement />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/shopify-development" element={<ShopifyDevelopment />} />
            <Route path="/services/shopify-integration" element={<ShopifyIntegration />} />
            
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
            <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
            <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
            
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/free-audit" element={<FreeAudit />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
