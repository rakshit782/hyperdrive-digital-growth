
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const FreeAudit = lazy(() => import("./pages/FreeAudit"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load existing service pages
const AmazonAdvertising = lazy(() => import("./pages/AmazonAdvertising"));
const GoogleAdvertising = lazy(() => import("./pages/GoogleAdvertising"));
const MetaAdvertising = lazy(() => import("./pages/MetaAdvertising"));
const WalmartAdvertising = lazy(() => import("./pages/WalmartAdvertising"));
const WebsiteDevelopment = lazy(() => import("./pages/WebsiteDevelopment"));
const ShopifyDevelopment = lazy(() => import("./pages/ShopifyDevelopment"));
const ShopifyIntegration = lazy(() => import("./pages/ShopifyIntegration"));
const AccountManagement = lazy(() => import("./pages/AccountManagement"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <AuthProvider>
            <BrowserRouter>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
              }>
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
              </Suspense>
              <Toaster />
            </BrowserRouter>
          </AuthProvider>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
