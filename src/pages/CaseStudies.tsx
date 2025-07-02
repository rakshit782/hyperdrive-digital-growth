
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CaseStudyPopup from "@/components/CaseStudyPopup";
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
  client_name?: string;
  image_url?: string;
  service_type?: string;
}

const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy) => {
    // Convert the case study format for the popup
    const popupCaseStudy = {
      id: caseStudy.id,
      title: caseStudy.title,
      description: caseStudy.description,
      industry: caseStudy.industry,
      client_name: caseStudy.client_name || 'Confidential Client',
      image_url: caseStudy.imageUrl || caseStudy.image_url,
      results: caseStudy.results?.metric1 ? {
        [caseStudy.results.metric1.label]: caseStudy.results.metric1.value,
        [caseStudy.results.metric2.label]: caseStudy.results.metric2.value,
        [caseStudy.results.metric3.label]: caseStudy.results.metric3.value,
      } : caseStudy.results || {},
      service_type: caseStudy.service_type || caseStudy.platform?.toLowerCase().replace(' ', '-')
    };
    
    setSelectedCaseStudy(popupCaseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([
    // Amazon Case Studies
    {
      id: "amazon-case-1",
      title: "Fashion Brand Scales to $2M Revenue",
      description: "Strategic PPC campaigns and listing optimization that increased Amazon sales by 400% in 6 months through advanced keyword targeting and bid optimization strategies.",
      results: {
        metric1: { label: "Revenue Increase", value: "400%" },
        metric2: { label: "ROAS Improvement", value: "5.2x" },
        metric3: { label: "Market Share Growth", value: "25%" }
      },
      industry: "Fashion & Apparel",
      platform: "Amazon Advertising",
      client_name: "StyleHub Fashion",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      id: "amazon-case-2",
      title: "Electronics Brand Dominates Search",
      description: "Comprehensive keyword strategy and campaign restructuring that resulted in 300% sales growth and category leadership position.",
      results: {
        metric1: { label: "Sales Growth", value: "300%" },
        metric2: { label: "Search Ranking", value: "#1 Position" },
        metric3: { label: "Market Share", value: "+45%" }
      },
      industry: "Electronics",
      platform: "Amazon Advertising",
      client_name: "TechGear Pro",
      imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop"
    },
    {
      id: "amazon-case-3",
      title: "Beauty Brand Market Leadership",
      description: "Brand-focused campaign strategy with sponsored brand ads that established market dominance and drove exceptional brand awareness.",
      results: {
        metric1: { label: "Brand Awareness", value: "+380%" },
        metric2: { label: "Sales Growth", value: "+250%" },
        metric3: { label: "Customer Acquisition", value: "+190%" }
      },
      industry: "Beauty & Cosmetics",
      platform: "Amazon Advertising",
      client_name: "Pure Beauty",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      id: "amazon-case-4",
      title: "Sports Equipment Market Expansion",
      description: "Multi-category expansion strategy with targeted campaigns that drove massive growth across sports and recreation segments.",
      results: {
        metric1: { label: "Market Expansion", value: "+380%" },
        metric2: { label: "Cross-Category Growth", value: "+250%" },
        metric3: { label: "Customer Lifetime Value", value: "+140%" }
      },
      industry: "Sports & Recreation",
      platform: "Amazon Advertising",
      client_name: "Elite Athletic",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      id: "amazon-case-5",
      title: "Kitchen Appliance Revenue Breakthrough",
      description: "Dynamic campaign scheduling and inventory-based bidding that transformed kitchen brand performance and customer engagement.",
      results: {
        metric1: { label: "Revenue Growth", value: "+365%" },
        metric2: { label: "Inventory Turnover", value: "+180%" },
        metric3: { label: "Profit Margin", value: "+90%" }
      },
      industry: "Kitchen & Home",
      platform: "Amazon Advertising",
      client_name: "Chef's Choice Pro",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
      id: "amazon-case-6",
      title: "Pet Supplies Category Domination",
      description: "Campaign consolidation and automated bidding implementation that established category leadership and drove exceptional growth.",
      results: {
        metric1: { label: "Category Ranking", value: "#1 Position" },
        metric2: { label: "Sales Growth", value: "+430%" },
        metric3: { label: "Customer Retention", value: "+200%" }
      },
      industry: "Pet Supplies",
      platform: "Amazon Advertising",
      client_name: "Happy Pets Co",
      imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    
    // Walmart Case Studies
    {
      id: "walmart-case-1",
      title: "Home Goods Brand Walmart Success",
      description: "Complete Walmart Connect advertising strategy that resulted in 280% sales growth and category dominance through strategic product positioning.",
      results: {
        metric1: { label: "Sales Growth", value: "280%" },
        metric2: { label: "Click-Through Rate", value: "+160%" },
        metric3: { label: "Conversion Rate", value: "+90%" }
      },
      industry: "Home & Garden",
      platform: "Walmart Advertising",
      client_name: "HomeStyle Plus",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
      id: "walmart-case-2",
      title: "Tech Gadgets Marketplace Domination",
      description: "Strategic campaign optimization and inventory management that led to market leadership and exceptional ROI performance.",
      results: {
        metric1: { label: "Revenue Growth", value: "+350%" },
        metric2: { label: "Market Share", value: "+65%" },
        metric3: { label: "ROAS", value: "4.8x" }
      },
      industry: "Technology",
      platform: "Walmart Advertising",
      client_name: "TechSmart Pro",
      imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop"
    },
    {
      id: "walmart-case-3",
      title: "Fashion Brand Seasonal Success",
      description: "Seasonal campaign strategies and trend-based targeting that maximized fashion brand performance across all seasons.",
      results: {
        metric1: { label: "Seasonal Revenue", value: "+420%" },
        metric2: { label: "Brand Recognition", value: "+180%" },
        metric3: { label: "Customer Retention", value: "+95%" }
      },
      industry: "Fashion & Apparel",
      platform: "Walmart Advertising",
      client_name: "Urban Trends",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      id: "walmart-case-4",
      title: "Health & Beauty Category Leadership",
      description: "Comprehensive brand strategy and customer acquisition campaigns that established category leadership and drove sustainable growth.",
      results: {
        metric1: { label: "Category Ranking", value: "#1 Position" },
        metric2: { label: "Customer Acquisition", value: "+310%" },
        metric3: { label: "Brand Loyalty", value: "+220%" }
      },
      industry: "Health & Beauty",
      platform: "Walmart Advertising",
      client_name: "Wellness Essentials",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      id: "walmart-case-5",
      title: "Sports Equipment Market Expansion",
      description: "Multi-category expansion strategy with targeted campaigns that drove massive growth across sports and recreation segments.",
      results: {
        metric1: { label: "Market Expansion", value: "+380%" },
        metric2: { label: "Cross-Category Growth", value: "+250%" },
        metric3: { label: "Customer Lifetime Value", value: "+140%" }
      },
      industry: "Sports & Recreation",
      platform: "Walmart Advertising",
      client_name: "Elite Athletic",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      id: "walmart-case-6",
      title: "Kitchen & Dining Revenue Breakthrough",
      description: "Strategic product bundling and cross-selling campaigns that transformed kitchen brand performance and customer engagement.",
      results: {
        metric1: { label: "Bundle Sales", value: "+460%" },
        metric2: { label: "Cross-Sell Rate", value: "+195%" },
        metric3: { label: "Customer Satisfaction", value: "4.9/5" }
      },
      industry: "Kitchen & Dining",
      platform: "Walmart Advertising",
      client_name: "Culinary Masters",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    
    // Meta Case Studies
    {
      id: "meta-case-1",
      title: "E-commerce Fashion Brand Scaling",
      description: "Advanced audience segmentation with lookalike campaigns and retargeting funnels that transformed customer acquisition costs and drove massive growth.",
      results: {
        metric1: { label: "ROAS Increase", value: "520%" },
        metric2: { label: "Sales Growth", value: "$2.1M" },
        metric3: { label: "Cost Per Acquisition", value: "-65%" }
      },
      industry: "Fashion & E-commerce",
      platform: "Meta Advertising",
      client_name: "Trendy Threads",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      id: "meta-case-2",
      title: "SaaS Company Lead Generation",
      description: "B2B targeting with video campaigns and lead form optimization that revolutionized lead quality and conversion rates for enterprise software.",
      results: {
        metric1: { label: "Lead Quality", value: "+450%" },
        metric2: { label: "Conversion Rate", value: "+280%" },
        metric3: { label: "Sales Pipeline", value: "$1.8M" }
      },
      industry: "SaaS Technology",
      platform: "Meta Advertising",
      client_name: "CloudTech Solutions",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: "meta-case-3",
      title: "Local Restaurant Chain Growth",
      description: "Location-based targeting with dynamic product ads and event promotion that drove foot traffic and online orders across multiple locations.",
      results: {
        metric1: { label: "Foot Traffic", value: "+380%" },
        metric2: { label: "Online Orders", value: "+250%" },
        metric3: { label: "Brand Awareness", value: "+190%" }
      },
      industry: "Food & Hospitality",
      platform: "Meta Advertising",
      client_name: "Gourmet Bites",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
    },
    {
      id: "meta-case-4",
      title: "Fitness Brand Community Building",
      description: "Community-focused campaigns with user-generated content and influencer partnerships that built a loyal fitness community and drove sales.",
      results: {
        metric1: { label: "Community Growth", value: "+410%" },
        metric2: { label: "Engagement Rate", value: "+290%" },
        metric3: { label: "Subscription Sales", value: "$1.3M" }
      },
      industry: "Health & Fitness",
      platform: "Meta Advertising",
      client_name: "FitLife Pro",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      id: "meta-case-5",
      title: "Beauty Brand Influencer Success",
      description: "Micro-influencer campaigns with authentic content and social proof that broke through market saturation and established brand authority.",
      results: {
        metric1: { label: "Influencer ROI", value: "+480%" },
        metric2: { label: "Brand Mentions", value: "+350%" },
        metric3: { label: "Sales Growth", value: "$1.6M" }
      },
      industry: "Beauty & Cosmetics",
      platform: "Meta Advertising",
      client_name: "Radiant Beauty",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      id: "meta-case-6",
      title: "Home Services Lead Generation",
      description: "Geo-targeted campaigns with seasonal messaging and lead nurturing that solved seasonal business challenges and ensured consistent growth.",
      results: {
        metric1: { label: "Lead Generation", value: "+350%" },
        metric2: { label: "Service Bookings", value: "+240%" },
        metric3: { label: "Customer Acquisition", value: "$780K" }
      },
      industry: "Home Services",
      platform: "Meta Advertising",
      client_name: "Elite Contractors",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    
    // Google Advertising Case Studies
    {
      id: "google-case-1",
      title: "Local Business Google Ads Success",
      description: "Strategic Google Ads campaigns with local targeting that drove massive foot traffic and online conversions for local service business.",
      results: {
        metric1: { label: "Lead Generation", value: "+380%" },
        metric2: { label: "Cost Per Click", value: "-45%" },
        metric3: { label: "Conversion Rate", value: "+220%" }
      },
      industry: "Local Services",
      platform: "Google Advertising",
      client_name: "Premier Services",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
    },
    {
      id: "google-case-2",
      title: "B2B Software Google Search Domination",
      description: "Comprehensive search marketing strategy that established market leadership and drove high-quality enterprise leads through Google Ads.",
      results: {
        metric1: { label: "Search Visibility", value: "+450%" },
        metric2: { label: "Enterprise Leads", value: "+320%" },
        metric3: { label: "Quality Score", value: "9.2/10" }
      },
      industry: "Enterprise Software",
      platform: "Google Advertising",
      client_name: "CloudTech Enterprise",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: "google-case-3",
      title: "E-commerce Shopping Campaign Success",
      description: "Strategic Google Shopping campaigns with product feed optimization that drove exceptional e-commerce performance and ROI.",
      results: {
        metric1: { label: "Shopping Revenue", value: "+420%" },
        metric2: { label: "Product Visibility", value: "+280%" },
        metric3: { label: "ROAS", value: "6.8x" }
      },
      industry: "E-commerce Retail",
      platform: "Google Advertising",
      client_name: "ShopTech Pro",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
    },
    {
      id: "google-case-4",
      title: "Healthcare Practice Growth",
      description: "Local search optimization with targeted healthcare campaigns that drove patient acquisition and appointment bookings.",
      results: {
        metric1: { label: "Patient Leads", value: "+350%" },
        metric2: { label: "Appointment Bookings", value: "+240%" },
        metric3: { label: "Local Rankings", value: "Top 3" }
      },
      industry: "Healthcare",
      platform: "Google Advertising",
      client_name: "Premier Health",
      imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop"
    },
    {
      id: "google-case-5",
      title: "Real Estate Lead Generation",
      description: "Geo-targeted campaigns with landing page optimization that revolutionized real estate lead generation and conversion rates.",
      results: {
        metric1: { label: "Property Leads", value: "+390%" },
        metric2: { label: "Qualified Inquiries", value: "+250%" },
        metric3: { label: "Cost Per Lead", value: "-55%" }
      },
      industry: "Real Estate",
      platform: "Google Advertising",
      client_name: "Prime Realty",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    },
    {
      id: "google-case-6",
      title: "Legal Services Marketing Success",
      description: "Strategic legal marketing campaigns with compliance-focused targeting that drove high-value client acquisition.",
      results: {
        metric1: { label: "Client Acquisition", value: "+320%" },
        metric2: { label: "Case Value", value: "+180%" },
        metric3: { label: "Consultation Bookings", value: "+275%" }
      },
      industry: "Legal Services",
      platform: "Google Advertising",
      client_name: "Elite Legal Group",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop"
    },
    
    // Account Management Case Studies
    {
      id: "account-case-1",
      title: "Strategic Account Growth Success",
      description: "Transformed a mid-size company's account management strategy, resulting in exceptional growth and client satisfaction across all platforms.",
      results: {
        metric1: { label: "Client Retention", value: "+45%" },
        metric2: { label: "Revenue Growth", value: "+180%" },
        metric3: { label: "Account Satisfaction", value: "+95%" }
      },
      industry: "Multi-Platform",
      platform: "Account Management",
      client_name: "Growth Dynamics",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    
    // Shopify Development Case Studies
    {
      id: "shopify-dev-case-1",
      title: "Custom Shopify Development Excellence",
      description: "Built a completely custom Shopify solution with advanced features, resulting in exceptional performance and user experience improvements.",
      results: {
        metric1: { label: "Page Speed", value: "+250%" },
        metric2: { label: "Conversion Rate", value: "+120%" },
        metric3: { label: "Mobile Performance", value: "+180%" }
      },
      industry: "E-commerce",
      platform: "Shopify Development",
      client_name: "Fashion Forward",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
    }
  ]);

  useEffect(() => {
    // Load case studies from localStorage if available
    const loadCaseStudies = () => {
      const savedStudies = localStorage.getItem('caseStudiesData');
      if (savedStudies) {
        try {
          const parsed = JSON.parse(savedStudies);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCaseStudies(parsed);
          }
        } catch (error) {
          console.error('Failed to parse case studies:', error);
        }
      }
    };

    loadCaseStudies();

    // Listen for updates from dashboard
    const handleStudiesUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setCaseStudies(event.detail);
      }
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
        description="Explore our successful case studies showing real results from Amazon, Walmart, Meta, and Google advertising campaigns."
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
              Real results from real businesses. See how we've helped brands achieve extraordinary growth through strategic advertising across all our service areas.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <div 
                  key={study.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleCaseStudyClick(study)}
                >
                  {study.imageUrl && (
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">
                      <img 
                        src={study.imageUrl} 
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
                    
                    <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
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
                    
                    <button className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700">
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

      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

      <Footer />
    </>
  );
};

export default CaseStudies;
