
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowUpRight, TrendingUp, Target, DollarSign } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  results: {
    metric1: { label: string; value: string; };
    metric2: { label: string; value: string; };
    metric3: { label: string; value: string; };
  };
  industry: string;
  platform: string;
  imageUrl?: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([
    {
      id: "1",
      title: "E-commerce Fashion Brand Scales to $2M Revenue",
      description: "How we helped a fashion startup increase their Amazon sales by 400% in 6 months through strategic PPC campaigns and listing optimization.",
      results: {
        metric1: { label: "Revenue Increase", value: "400%" },
        metric2: { label: "ROAS Improvement", value: "5.2x" },
        metric3: { label: "Market Share Growth", value: "25%" }
      },
      industry: "Fashion",
      platform: "Amazon"
    },
    {
      id: "2", 
      title: "Tech Gadgets Brand Dominates Walmart Marketplace",
      description: "A comprehensive Walmart Connect advertising strategy that resulted in 300% sales growth and category leadership.",
      results: {
        metric1: { label: "Sales Growth", value: "300%" },
        metric2: { label: "Click-Through Rate", value: "+180%" },
        metric3: { label: "Conversion Rate", value: "+95%" }
      },
      industry: "Technology",
      platform: "Walmart"
    },
    {
      id: "3",
      title: "Home Decor Brand's Meta Advertising Success",
      description: "Strategic Facebook and Instagram campaigns that drove massive brand awareness and direct-to-consumer sales growth.",
      results: {
        metric1: { label: "Brand Awareness", value: "+250%" },
        metric2: { label: "Website Traffic", value: "+320%" },
        metric3: { label: "Customer Acquisition", value: "+190%" }
      },
      industry: "Home & Garden",
      platform: "Meta"
    }
  ]);

  useEffect(() => {
    // Load case studies from localStorage if available
    const savedStudies = localStorage.getItem('caseStudiesData');
    if (savedStudies) {
      try {
        const parsed = JSON.parse(savedStudies);
        if (Array.isArray(parsed)) {
          setCaseStudies(parsed);
        }
      } catch (error) {
        console.error('Failed to parse case studies:', error);
      }
    }

    // Listen for updates
    const handleStudiesUpdate = (event: CustomEvent) => {
      setCaseStudies(event.detail);
    };

    window.addEventListener('caseStudiesUpdated', handleStudiesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('caseStudiesUpdated', handleStudiesUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Case Studies - Proven Results in Digital Advertising"
        description="Explore our successful case studies showing real results from Amazon, Walmart, and Meta advertising campaigns."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Real results from real businesses. See how we've helped brands achieve extraordinary growth through strategic advertising.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <div key={study.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                  {study.imageUrl && (
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                      <img 
                        src={study.imageUrl} 
                        alt={study.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {study.platform}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {study.industry}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                      {study.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {study.description}
                    </p>
                    
                    {/* Results Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2 mx-auto">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">{study.results.metric1.value}</div>
                        <div className="text-xs text-slate-500">{study.results.metric1.label}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2 mx-auto">
                          <Target className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{study.results.metric2.value}</div>
                        <div className="text-xs text-slate-500">{study.results.metric2.label}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2 mx-auto">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{study.results.metric3.value}</div>
                        <div className="text-xs text-slate-500">{study.results.metric3.label}</div>
                      </div>
                    </div>
                    
                    <button className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                      View Full Case Study
                      <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CaseStudies;
