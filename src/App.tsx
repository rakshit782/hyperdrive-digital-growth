
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy load components for better performance
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/ServicesPage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const FreeAudit = lazy(() => import("./pages/FreeAudit"));
const Blog = lazy(() => import("./pages/Blog"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Service pages
const AmazonAdvertising = lazy(() => import("./pages/AmazonAdvertising"));
const GoogleAdvertising = lazy(() => import("./pages/GoogleAdvertising"));
const MetaAdvertising = lazy(() => import("./pages/MetaAdvertising"));
const WalmartAdvertising = lazy(() => import("./pages/WalmartAdvertising"));
const AccountManagement = lazy(() => import("./pages/AccountManagement"));
const WebsiteDevelopment = lazy(() => import("./pages/WebsiteDevelopment"));
const ShopifyDevelopment = lazy(() => import("./pages/ShopifyDevelopment"));
const ShopifyIntegration = lazy(() => import("./pages/ShopifyIntegration"));

// Case study pages
const AmazonCaseStudies = lazy(() => import("./pages/AmazonCaseStudies"));
const MetaCaseStudies = lazy(() => import("./pages/MetaCaseStudies"));
const WalmartCaseStudies = lazy(() => import("./pages/WalmartCaseStudies"));

// Policy pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

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
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/services"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Services />
                </Suspense>
              }
            />
            
            {/* Service Detail Pages */}
            <Route
              path="/services/amazon-advertising"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AmazonAdvertising />
                </Suspense>
              }
            />
            <Route
              path="/services/google-advertising"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <GoogleAdvertising />
                </Suspense>
              }
            />
            <Route
              path="/services/meta-advertising"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MetaAdvertising />
                </Suspense>
              }
            />
            <Route
              path="/services/walmart-advertising"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WalmartAdvertising />
                </Suspense>
              }
            />
            <Route
              path="/services/account-management"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AccountManagement />
                </Suspense>
              }
            />
            <Route
              path="/services/website-development"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WebsiteDevelopment />
                </Suspense>
              }
            />
            <Route
              path="/services/shopify-development"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ShopifyDevelopment />
                </Suspense>
              }
            />
            <Route
              path="/services/shopify-integration"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ShopifyIntegration />
                </Suspense>
              }
            />
            
            <Route
              path="/case-studies"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CaseStudies />
                </Suspense>
              }
            />
            <Route
              path="/amazon-case-studies"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AmazonCaseStudies />
                </Suspense>
              }
            />
            <Route
              path="/meta-case-studies"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MetaCaseStudies />
                </Suspense>
              }
            />
            <Route
              path="/walmart-case-studies"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WalmartCaseStudies />
                </Suspense>
              }
            />
            <Route
              path="/pricing"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Pricing />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/free-audit"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FreeAudit />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="/auth"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Auth />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <TermsOfService />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
