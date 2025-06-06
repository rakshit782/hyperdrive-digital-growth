
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import CaseStudies from "@/pages/CaseStudies";
import AmazonCaseStudies from "@/pages/AmazonCaseStudies";
import WalmartCaseStudies from "@/pages/WalmartCaseStudies";
import MetaCaseStudies from "@/pages/MetaCaseStudies";
import AmazonAdvertising from "@/pages/AmazonAdvertising";
import WalmartAdvertising from "@/pages/WalmartAdvertising";
import MetaAdvertising from "@/pages/MetaAdvertising";
import AccountManagement from "@/pages/AccountManagement";
import ShopifyIntegration from "@/pages/ShopifyIntegration";
import ShopifyDevelopment from "@/pages/ShopifyDevelopment";
import Pricing from "@/pages/Pricing";
import FreeAudit from "@/pages/FreeAudit";
import Dashboard from "@/pages/Dashboard";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white w-full">
          <Routes>
            <Route path="/" element={<><Header /><Index /></>} />
            <Route path="/about" element={<><Header /><About /></>} />
            <Route path="/contact" element={<><Header /><Contact /></>} />
            <Route path="/case-studies" element={<><Header /><CaseStudies /></>} />
            <Route path="/amazon-case-studies" element={<><Header /><AmazonCaseStudies /></>} />
            <Route path="/walmart-case-studies" element={<><Header /><WalmartCaseStudies /></>} />
            <Route path="/meta-case-studies" element={<><Header /><MetaCaseStudies /></>} />
            <Route path="/amazon-advertising" element={<><Header /><AmazonAdvertising /></>} />
            <Route path="/walmart-advertising" element={<><Header /><WalmartAdvertising /></>} />
            <Route path="/meta-advertising" element={<><Header /><MetaAdvertising /></>} />
            <Route path="/account-management" element={<><Header /><AccountManagement /></>} />
            <Route path="/shopify-integration" element={<><Header /><ShopifyIntegration /></>} />
            <Route path="/shopify-development" element={<><Header /><ShopifyDevelopment /></>} />
            <Route path="/pricing" element={<><Header /><Pricing /></>} />
            <Route path="/free-audit" element={<><Header /><FreeAudit /></>} />
            <Route path="/blog" element={<><Header /><Blog /></>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<><Header /><NotFound /></>} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
