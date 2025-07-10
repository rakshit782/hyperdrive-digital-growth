
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
  // Get the icon component for stats
  const getStatIcon = (iconName?: string) => {
    if (!iconName) return TrendingUp;
    return (Icons as any)[iconName] || TrendingUp;
  };

  const displayStats = stats.slice(0, 4);

  if (displayStats.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10">
          Proven Results
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat) => {
            const IconComponent = getStatIcon(stat.icon_name);
            return (
              <Card key={stat.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.stat_value}</div>
                  <div className="text-base font-medium text-slate-800 mb-1">{stat.stat_label}</div>
                  <p className="text-slate-600 text-xs">{stat.stat_description}</p>
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
