import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Target, 
  Code2, 
  Link2 
} from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  gradient: string;
  iconGradient: string;
  bgGlow: string;
  features: { label: string; href: string }[];
}

const services: ServiceItem[] = [
  {
    title: "Marketplace Services",
    description: "End-to-end Amazon & Walmart marketplace management. We engineer high-converting PPC campaigns, craft SEO-driven A+ listings, manage product catalogs, and safeguard account health.",
    icon: ShoppingCart,
    link: "/services/amazon-advertising",
    gradient: "from-orange-500 via-amber-500 to-red-500",
    iconGradient: "from-orange-500 to-amber-600",
    bgGlow: "bg-orange-500/10",
    features: [
      { label: "Amazon Advertising & Account Management", href: "/services/amazon-advertising" },
      { label: "Walmart Advertising & Account Management", href: "/services/walmart-advertising" },
      { label: "Listing Optimization", href: "/services/listing-optimization" },
      { label: "Product Cataloging", href: "/services/product-cataloging" },
    ],
  },
  {
    title: "Google & Meta Ads",
    description: "Omni-channel paid acquisition that captures high-intent shoppers and fuels scalable growth across Google Search, Shopping, Performance Max, and targeted Facebook & Instagram ad funnels.",
    icon: Target,
    link: "/services/meta-advertising",
    gradient: "from-blue-600 via-indigo-600 to-pink-500",
    iconGradient: "from-indigo-600 to-pink-600",
    bgGlow: "bg-blue-500/10",
    features: [
      { label: "Google Search & Shopping", href: "/services/google-advertising" },
      { label: "Performance Max", href: "/services/google-advertising" },
      { label: "Meta Ads (FB & IG)", href: "/services/meta-advertising" },
      { label: "Audience Retargeting", href: "/services/meta-advertising" },
      { label: "Creative Optimization", href: "/services/google-advertising" },
    ],
  },
  {
    title: "Shopify & Wordpress",
    description: "High-performance storefront development and conversion rate optimization. We build lightning-fast Shopify stores, custom WooCommerce sites, mobile-first UX, and tailored theme experiences.",
    icon: Code2,
    link: "/services/shopify-development",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    iconGradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/10",
    features: [
      { label: "Shopify Store Builds", href: "/services/shopify-development" },
      { label: "WordPress & WooCommerce", href: "/services/website-development" },
      { label: "Custom Themes", href: "/services/shopify-development" },
      { label: "Speed & UX Optimization", href: "/services/website-development" },
      { label: "App & Plugin Integration", href: "/services/shopify-development" },
    ],
  },
  {
    title: "Automation & Integration",
    description: "Unified multi-channel commerce operations. Automatically synchronize real-time inventory, pricing, and orders across Amazon, Walmart, and Shopify with robust APIs and custom workflows.",
    icon: Link2,
    link: "/services/shopify-integration",
    gradient: "from-teal-500 via-cyan-500 to-indigo-600",
    iconGradient: "from-teal-500 to-cyan-600",
    bgGlow: "bg-teal-500/10",
    features: [
      { label: "Shopify & Marketplace Sync", href: "/services/shopify-integration" },
      { label: "Amazon Automation", href: "/services/amazon-integration" },
      { label: "Inventory & Order Sync", href: "/services/shopify-integration" },
      { label: "Automated Repricing", href: "/services/amazon-integration" },
      { label: "Multi-Channel APIs", href: "/services/shopify-integration" },
    ],
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Core Service Matrix
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Unified Marketplace & Growth
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Engineered for Measurable Scale
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal">
            We partner as an end-to-end commerce acceleration team, connecting organic ranking, full-funnel paid media, and operational data sync.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.title}
                className="group relative flex flex-col justify-between overflow-hidden bg-white border border-slate-200/90 hover:border-blue-400/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 rounded-3xl p-7 sm:p-9"
              >
                {/* Top Accent Gradient Line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient}`} />

                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Icon & Title Header */}
                  <CardHeader className="p-0 pb-4">
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      <Link to={service.link} className="hover:underline">
                        {service.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>

                  {/* Description */}
                  <CardContent className="p-0 flex-grow">
                    <CardDescription className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {service.description}
                    </CardDescription>

                    {/* Feature Chips / Pills */}
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <Link
                            key={idx}
                            to={feature.href}
                            className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg transition-colors font-medium border border-slate-200/60 hover:border-blue-300"
                          >
                            {feature.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
