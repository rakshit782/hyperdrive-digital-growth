
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import SEOHead from "@/components/SEOHead";
import TrackingScriptInjector from "@/components/TrackingScriptInjector";
import Footer from "@/components/Footer";
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
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Facebook Pixel
  useFacebookPixel();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SEOHead />
            <TrackingScriptInjector />
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<><About /><Footer /></>} />
                  <Route path="/pricing" element={<><Pricing /><Footer /></>} />
                  <Route path="/contact" element={<><Contact /><Footer /></>} />
                  <Route path="/free-audit" element={<><FreeAudit /><Footer /></>} />
                  <Route path="/auth" element={<><Auth /><Footer /></>} />
                  <Route path="/dashboard" element={<><Dashboard /><Footer /></>} />
                  <Route path="/blog" element={<><Blog /><Footer /></>} />
                  <Route path="/case-studies" element={<><CaseStudies /><Footer /></>} />
                  <Route path="/amazon-advertising" element={<><AmazonAdvertising /><Footer /></>} />
                  <Route path="/walmart-advertising" element={<><WalmartAdvertising /><Footer /></>} />
                  <Route path="/meta-advertising" element={<><MetaAdvertising /><Footer /></>} />
                  <Route path="/account-management" element={<><AccountManagement /><Footer /></>} />
                  <Route path="/shopify-integration" element={<><ShopifyIntegration /><Footer /></>} />
                  <Route path="/shopify-development" element={<><ShopifyDevelopment /><Footer /></>} />
                  <Route path="/amazon-case-studies" element={<><AmazonCaseStudies /><Footer /></>} />
                  <Route path="/walmart-case-studies" element={<><WalmartCaseStudies /><Footer /></>} />
                  <Route path="/meta-case-studies" element={<><MetaCaseStudies /><Footer /></>} />
                  <Route path="*" element={<><NotFound /><Footer /></>} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
