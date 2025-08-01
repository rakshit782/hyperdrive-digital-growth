
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

// Direct imports instead of lazy loading
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FreeAudit from "./pages/FreeAudit";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// Direct imports for existing service pages
import AmazonAdvertising from "./pages/AmazonAdvertising";
import GoogleAdvertising from "./pages/GoogleAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import ShopifyIntegration from "./pages/ShopifyIntegration";
import AccountManagement from "./pages/AccountManagement";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/free-audit" element={<FreeAudit />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Service routes */}
              <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
              <Route path="/google-advertising" element={<GoogleAdvertising />} />
              <Route path="/meta-advertising" element={<MetaAdvertising />} />
              <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
              <Route path="/website-development" element={<WebsiteDevelopment />} />
              <Route path="/shopify-development" element={<ShopifyDevelopment />} />
              <Route path="/shopify-integration" element={<ShopifyIntegration />} />
              <Route path="/account-management" element={<AccountManagement />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
