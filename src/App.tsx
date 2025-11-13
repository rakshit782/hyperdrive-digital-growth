
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import TrackingScriptInjector from "./components/TrackingScriptInjector";
import { VisitorTracker } from "./components/VisitorTracker";
import Index from "./pages/Index";

// Direct imports for instant loading - no lazy loading
import About from "./pages/About";
import Services from "./pages/ServicesPage";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import ListingOptimizationPage from "./pages/ListingOptimizationPage";
import ProductCatalogingPage from "./pages/ProductCatalogingPage";
import NotFound from "./pages/NotFound";

// Legal pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";

// Case study pages
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";

// Dashboard
import Dashboard from "./pages/Dashboard";
import DashboardAuth from "./pages/DashboardAuth";
import DashboardSignup from "./pages/DashboardSignup";

// Detailed service pages
import DetailedServicePage from "./pages/DetailedServicePage";
import AdLanding from "./pages/AdLanding";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <TrackingScriptInjector />
              <VisitorTracker />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/website-development" element={<WebsiteDevelopment />} />
                <Route path="/services/listing-optimization" element={<ListingOptimizationPage />} />
                <Route path="/services/product-cataloging" element={<ProductCatalogingPage />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
                <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
                <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/free-audit" element={<Contact />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/dashboard/login" element={<DashboardAuth />} />
                <Route path="/dashboard/signup" element={<DashboardSignup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services/:serviceType" element={<DetailedServicePage />} />
                <Route path="/ad-landing" element={<AdLanding />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
