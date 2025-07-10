
import { Card, CardContent } from '@/components/ui/card';

interface Feature {
  icon: any;
  title: string;
  description: string;
  gradient: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
}

const FeaturesSection = ({ title, features }: FeaturesSectionProps) => {
  const displayFeatures = features.slice(0, 4);

  return (
    <section className="py-12 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Master {title.split(' ')[0]}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive solutions designed to elevate your business performance and drive exceptional results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
