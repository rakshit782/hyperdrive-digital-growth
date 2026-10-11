import React from "react";
import { Search, FileText, Rocket, TrendingUp } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  badgeColor: string;
  textColor: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Audit",
    description: "Understand your business, goals and current performance.",
    icon: Search,
    gradient: "from-blue-600 to-cyan-500",
    glowColor: "shadow-[0_12px_32px_-6px_rgba(37,99,235,0.4)]",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    textColor: "text-blue-600",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Create a custom growth strategy and action plan.",
    icon: FileText,
    gradient: "from-purple-600 to-indigo-500",
    glowColor: "shadow-[0_12px_32px_-6px_rgba(147,51,234,0.4)]",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    textColor: "text-purple-600",
  },
  {
    number: "03",
    title: "Execute",
    description: "Launch and manage campaigns & optimizations.",
    icon: Rocket,
    gradient: "from-rose-500 to-orange-400",
    glowColor: "shadow-[0_12px_32px_-6px_rgba(244,63,94,0.4)]",
    badgeColor: "bg-rose-50 text-rose-600 border-rose-200",
    textColor: "text-rose-600",
  },
  {
    number: "04",
    title: "Scale",
    description: "Monitor results and scale what works.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "shadow-[0_12px_32px_-6px_rgba(16,185,129,0.4)]",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    textColor: "text-emerald-600",
  },
];

const OurProcess: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-blue-100 mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            A Simple 4-Step Process
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            We make e-commerce growth simple, transparent and measurable.
          </p>
        </div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Horizontal Connecting Dashed Line for Desktop */}
          <div 
            className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 pointer-events-none z-0" 
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.number} 
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circle Icon Container */}
                  <div className="relative mb-5">
                    <div 
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white ${step.glowColor} group-hover:scale-105 transition-all duration-300 relative z-10`}
                    >
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[2.2]" />
                    </div>

                    {/* Intermediate indicator for lg screens (shown between step 1-2, 2-3, 3-4) */}
                    {idx < steps.length - 1 && (
                      <div 
                        className="hidden lg:flex absolute top-1/2 -right-8 xl:-right-10 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-[10px] font-bold text-slate-400 z-20 shadow-sm"
                        aria-hidden="true"
                      >
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Step Number Tag */}
                  <span className={`text-xs font-bold tracking-wider mb-2 ${step.textColor}`}>
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 max-w-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
