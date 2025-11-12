
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCTAProps {
  title: string;
  description: string;
  buttonText: string;
  serviceType: string;
}

const ServiceCTA = ({ title, description, buttonText, serviceType }: ServiceCTAProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
        
        <Button 
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          onClick={() => window.location.href = '/contact'}
        >
          {buttonText}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default ServiceCTA;
