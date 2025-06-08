
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import SEOHead from "@/components/SEOHead";
import TrackingScriptInjector from "@/components/TrackingScriptInjector";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FreeAudit from "./pages/FreeAudit";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import AmazonAdvertising from "./pages/AmazonAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import AccountManagement from "./pages/AccountManagement";
import ShopifyIntegration from "./pages/ShopifyIntegration";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SEOHead />
          <TrackingScriptInjector />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/free-audit" element={<FreeAudit />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
            <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
            <Route path="/meta-advertising" element={<MetaAdvertising />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/shopify-integration" element={<ShopifyIntegration />} />
            <Route path="/shopify-development" element={<ShopifyDevelopment />} />
            <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
            <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
            <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
