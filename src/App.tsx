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

// Lazy load service pages
const ServiceSeo = lazy(() => import("./pages/services/Seo"));
const ServicePpc = lazy(() => import("./pages/services/Ppc"));
const ServiceWebDesign = lazy(() => import("./pages/services/WebDesign"));
const ServiceContent = lazy(() => import("./pages/services/Content"));
const ServiceSocialMedia = lazy(() => import("./pages/services/SocialMedia"));
const ServiceEmailMarketing = lazy(() => import("./pages/services/EmailMarketing"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                    <Route path="/services/seo" element={<ServiceSeo />} />
                    <Route path="/services/ppc" element={<ServicePpc />} />
                    <Route path="/services/web-design" element={<ServiceWebDesign />} />
                    <Route path="/services/content" element={<ServiceContent />} />
                    <Route path="/services/social-media" element={<ServiceSocialMedia />} />
                    <Route path="/services/email-marketing" element={<ServiceEmailMarketing />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
