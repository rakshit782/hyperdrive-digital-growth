import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ServiceStat {
  id: string;
  stat_value: string;
  stat_label: string;
  stat_description: string;
  icon_name?: string;
}

interface StatsSectionProps {
  stats: ServiceStat[];
  primaryColor: string;
  secondaryColor: string;
}

const StatsSection = ({ stats, primaryColor, secondaryColor }: StatsSectionProps) => {
  const getStatIcon = (iconName?: string) => {
    if (!iconName) return TrendingUp;
    return (Icons as any)[iconName] || TrendingUp;
  };

  const displayStats = stats.slice(0, 4);

  if (displayStats.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900">
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
            Our Track Record
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Proven Results
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Numbers that speak for themselves
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => {
            const IconComponent = getStatIcon(stat.icon_name);
            return (
              <Card 
                key={stat.id} 
                className="text-center bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                    <IconComponent className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.stat_value}</div>
                  <div className="text-base font-medium text-blue-300 mb-1">{stat.stat_label}</div>
                  <p className="text-slate-500 text-sm">{stat.stat_description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
