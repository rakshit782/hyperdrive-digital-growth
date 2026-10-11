import React from "react";
import { Check, X, Sparkles, AlertCircle } from "lucide-react";

interface ComparisonItem {
  title: string;
  description: string;
}

const amzBenefits: ComparisonItem[] = [
  {
    title: "SKU-Level Profit & Loss (P&L) Analysis",
    description: "Understand true product profitability with SKU-level revenue, advertising costs, marketplace fees, and margin insights.",
  },
  {
    title: "12-Month Growth Projection Blueprint",
    description: "A strategic roadmap covering sales forecasts, advertising budgets, profitability targets, and expansion opportunities.",
  },
  {
    title: "Multi-Marketplace Expansion Strategy",
    description: "Identify opportunities and build a roadmap to expand across Amazon, Walmart, and international marketplaces.",
  },
  {
    title: "Profit-Driven Advertising Management",
    description: "PPC strategies focused on sustainable growth, ACOS, TACOS, and overall profitability.",
  },
  {
    title: "360° Marketplace Management",
    description: "Advertising, catalog management, listing optimization, creative strategy, and account health.",
  },
  {
    title: "Advanced Analytics & Reporting",
    description: "Actionable dashboards, keyword intelligence, budget forecasting, and performance tracking.",
  },
  {
    title: "AI-Powered Advertising Automation",
    description: "Smarter bid optimization, budget monitoring, performance alerts, and automated workflows.",
  },
  {
    title: "Dedicated Strategic Account Ownership",
    description: "Experienced marketplace specialists driving execution, accountability, and continuous improvement.",
  },
];

const otherAgenciesChallenges: ComparisonItem[] = [
  {
    title: "No SKU-Level Profit Visibility",
    description: "Advertising reports show sales and spend but fail to reveal true product-level profitability.",
  },
  {
    title: "No 12-Month Growth Roadmap",
    description: "Decisions are reactive, with limited forecasting, budget planning, or long-term growth projections.",
  },
  {
    title: "Limited Marketplace Expansion Planning",
    description: "No structured strategy for entering new marketplaces or scaling internationally.",
  },
  {
    title: "Advertising Without Profit Alignment",
    description: "Campaigns focus on revenue and ACOS without considering total product margins and business costs.",
  },
  {
    title: "Fragmented Marketplace Management",
    description: "Advertising, listings, catalog, inventory, and pricing are managed in silos.",
  },
  {
    title: "Limited Data-Driven Insights",
    description: "Generic reports with little actionable intelligence or forward-looking analysis.",
  },
  {
    title: "Slow, Manual Optimization",
    description: "Delayed campaign adjustments and limited automation for identifying opportunities.",
  },
  {
    title: "Growth Without Accountability",
    description: "Increased spending without a clear roadmap for sustainable, profitable growth.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-blue-100 mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            The AMZ AD SCOUT Advantage
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Discover why high-growth brands choose our profit-first, 360° marketplace management over conventional advertising agencies.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: What AMZ AD SCOUT Brings to You */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border-2 border-emerald-500/20 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.12)] flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300">
            {/* Top Tag */}
            <div className="absolute -top-3.5 left-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              Recommended Growth Partner
            </div>

            <div>
              <div className="flex items-center gap-3.5 pb-6 border-b border-emerald-100/70 mb-6 mt-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    What AMZ AD SCOUT Brings to You
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 font-medium">
                    Sustainable, profitable marketplace scaling
                  </p>
                </div>
              </div>

              {/* Items List */}
              <ul className="space-y-4 sm:space-y-5">
                {amzBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="text-sm sm:text-base leading-relaxed">
                      <strong className="font-semibold text-slate-900">
                        {item.title}
                      </strong>
                      <span className="text-slate-600"> — {item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Challenges You Face with Other Agencies */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-9 border border-rose-200/80 shadow-[0_20px_50px_-15px_rgba(244,63,94,0.08)] flex flex-col justify-between hover:border-rose-300 transition-all duration-300">
            {/* Top Tag */}
            <div className="absolute -top-3.5 left-8 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-slate-200 shadow-sm">
              Standard Agencies
            </div>

            <div>
              <div className="flex items-center gap-3.5 pb-6 border-b border-rose-100/70 mb-6 mt-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Challenges You Face with Other Agencies
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-600 font-medium">
                    Common friction points sellers experience
                  </p>
                </div>
              </div>

              {/* Items List */}
              <ul className="space-y-4 sm:space-y-5">
                {otherAgenciesChallenges.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="text-sm sm:text-base leading-relaxed">
                      <strong className="font-semibold text-slate-800">
                        {item.title}
                      </strong>
                      <span className="text-slate-500"> — {item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
