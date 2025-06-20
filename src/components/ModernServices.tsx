
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { ServiceCard } from "@/types/dashboard";

const ModernServices = () => {
  const [services, setServices] = useState<ServiceCard[]>([]);

  useEffect(() => {
    const loadServices = () => {
      const savedServices = localStorage.getItem('servicesData');
      if (savedServices) {
        try {
          const parsedData = JSON.parse(savedServices);
          if (Array.isArray(parsedData)) {
            setServices(parsedData);
          }
        } catch (error) {
          console.log("Failed to parse services data:", error);
        }
      }
    };

    loadServices();

    const handleServicesUpdate = (event: CustomEvent) => {
      setServices(event.detail);
    };

    window.addEventListener('servicesUpdated', handleServicesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('servicesUpdated', handleServicesUpdate as EventListener);
    };
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Star;
    return Icon;
  };

  if (services.length === 0) return null;

  return (
    <section className="section-minimal bg-gradient-to-b from-white to-gray-50">
      <div className="container-minimal">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital marketing solutions designed to scale your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <div 
                key={service.id}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = service.link}
                >
                  Learn More
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
