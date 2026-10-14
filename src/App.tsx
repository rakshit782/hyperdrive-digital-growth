import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { VisitorTracker } from "./components/VisitorTracker";
import GlobalTracking from "./components/GlobalTracking";
import Index from "./pages/Index";
import Maintenance from "./pages/Maintenance";
import HomeOrMaintenance from "./pages/HomeOrMaintenance";

// Direct imports for public prerendered pages
import About from "./pages/About";
import Services from "./pages/ServicesPage";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import ListingOptimizationPage from "./pages/ListingOptimizationPage";
import ProductCatalogingPage from "./pages/ProductCatalogingPage";
import NotFound from "./pages/NotFound";

// Legal pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import EULA from "./pages/EULA";
import AMZCoPilotPrivacy from "./pages/AMZCoPilotPrivacy";
import AmazonAdsPartner from "./pages/AmazonAdsPartner";

// Case study pages
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";

// Detailed service pages
import DetailedServicePage from "./pages/DetailedServicePage";
import ToolAlternativesPage from "./pages/ToolAlternativesPage";
import VerifyCertificate from "./pages/VerifyCertificate";

// Client-only routes dynamically code-split to keep public page loads lightweight
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardAuth = lazy(() => import("./pages/DashboardAuth"));
const DashboardSignup = lazy(() => import("./pages/DashboardSignup"));
const AdLanding = lazy(() => import("./pages/AdLanding"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const ClientRouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnWindowFocus: false,
        staleTime: 30000,
      },
    },
  });
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export function AppContent() {
  return (
    <>
      <ScrollToTop />
      <GlobalTracking />
      <VisitorTracker />
      <Routes>
        <Route path="/" element={<HomeOrMaintenance />} />
        <Route path="/home" element={<Index />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/listing-optimization" element={<ListingOptimizationPage />} />
        <Route path="/services/product-cataloging" element={<ProductCatalogingPage />} />
        <Route path="/amazon-tools-alternative" element={<ToolAlternativesPage />} />
        <Route path="/helium-10-alternative" element={<ToolAlternativesPage />} />
        <Route path="/jungle-scout-alternative" element={<ToolAlternativesPage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
        <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
        <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<ClientRouteFallback />}>
              <BlogPost />
            </Suspense>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/free-audit" element={<Contact />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/amazon-ads-partner" element={<AmazonAdsPartner />} />
        <Route path="/eula" element={<EULA />} />
        <Route path="/amz-copilot-privacy" element={<AMZCoPilotPrivacy />} />
        <Route
          path="/dashboard/login"
          element={
            <Suspense fallback={<ClientRouteFallback />}>
              <DashboardAuth />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/signup"
          element={
            <Suspense fallback={<ClientRouteFallback />}>
              <DashboardSignup />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<ClientRouteFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="/services/:serviceType" element={<DetailedServicePage />} />
        <Route
          path="/ad-landing"
          element={
            <Suspense fallback={<ClientRouteFallback />}>
              <AdLanding />
            </Suspense>
          }
        />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
