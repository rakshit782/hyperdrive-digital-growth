
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
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
