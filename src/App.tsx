import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import AmazonAdvertising from "./pages/AmazonAdvertising";
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import WalmartAdvertising from "./pages/WalmartAdvertising";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";
import MetaAdvertising from "./pages/MetaAdvertising";
import AccountManagement from "./pages/AccountManagement";
import ShopifyIntegration from "./pages/ShopifyIntegration";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import FreeAudit from "./pages/FreeAudit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/amazon-advertising" element={<AmazonAdvertising />} />
        <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
        <Route path="/walmart-advertising" element={<WalmartAdvertising />} />
        <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
        <Route path="/meta-advertising" element={<MetaAdvertising />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/shopify-integration" element={<ShopifyIntegration />} />
        <Route path="/shopify-development" element={<ShopifyDevelopment />} />
        <Route path="/website-development" element={<WebsiteDevelopment />} />
        <Route path="/free-audit" element={<FreeAudit />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
