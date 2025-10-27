
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Direct imports for instant loading - no lazy loading
import About from "./pages/About";
import Services from "./pages/ServicesPage";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import NotFound from "./pages/NotFound";

// Case study pages
import AmazonCaseStudies from "./pages/AmazonCaseStudies";
import MetaCaseStudies from "./pages/MetaCaseStudies";
import WalmartCaseStudies from "./pages/WalmartCaseStudies";

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
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/amazon-case-studies" element={<AmazonCaseStudies />} />
            <Route path="/meta-case-studies" element={<MetaCaseStudies />} />
            <Route path="/walmart-case-studies" element={<WalmartCaseStudies />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
