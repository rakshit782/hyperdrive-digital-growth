
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FreeAudit from "./pages/FreeAudit";
import Blog from "./pages/Blog";
import AmazonAdvertising from "./pages/AmazonAdvertising";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import MetaAdvertising from "./pages/MetaAdvertising";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import AccountManagement from "./pages/AccountManagement";
import ShopifyIntegration from "./pages/ShopifyIntegration";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import TrackingScriptInjector from "./components/TrackingScriptInjector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TrackingScriptInjector />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/free-audit" element={<FreeAudit />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
          <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
          <Route path="/meta-advertising" element={<MetaAdvertising />} />
          <Route path="/website-development" element={<WebsiteDevelopment />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/shopify-integration" element={<ShopifyIntegration />} />
          <Route path="/shopify-development" element={<ShopifyDevelopment />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
