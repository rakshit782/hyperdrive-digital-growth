
import { ServiceStat } from '@/hooks/useServiceData';
import * as Icons from 'lucide-react';

interface ServiceStatsGridProps {
  stats: ServiceStat[];
  serviceType: string;
}

const ServiceStatsGrid = ({ stats, serviceType }: ServiceStatsGridProps) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Icons.TrendingUp;
    return (Icons as any)[iconName] || Icons.TrendingUp;
  };

  // Ensure we have exactly 4 stats
  const displayStats = stats.slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
          Our {serviceType} Results
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat) => {
            const IconComponent = getIcon(stat.icon_name);
            return (
              <div key={stat.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-3">{stat.stat_value}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{stat.stat_label}</h3>
                {stat.stat_description && (
                  <p className="text-slate-600 text-sm leading-relaxed">{stat.stat_description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceStatsGrid;
