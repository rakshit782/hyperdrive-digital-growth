
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Amazon Advertising',
      description: 'Maximize your Amazon sales with expert PPC management and optimization strategies.',
      image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=250',
      link: '/amazon-advertising',
      bgGradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Walmart Advertising',
      description: 'Grow your business on Walmart marketplace with targeted advertising solutions.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250',
      link: '/walmart-advertising',
      bgGradient: 'from-blue-500 via-indigo-500 to-purple-500'
    },
    {
      title: 'Google Advertising',
      description: 'Drive targeted traffic and conversions with strategic Google Ads campaigns.',
      image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250',
      link: '/google-advertising',
      bgGradient: 'from-green-500 via-teal-500 to-blue-500'
    },
    {
      title: 'Meta Advertising',
      description: 'Reach your audience on Facebook and Instagram with compelling ad campaigns.',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250',
      link: '/meta-advertising',
      bgGradient: 'from-purple-500 via-pink-500 to-red-500'
    },
    {
      title: 'Account Management',
      description: 'Professional account management services to optimize your advertising performance.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250',
      link: '/account-management',
      bgGradient: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    {
      title: 'Website Development',
      description: 'Custom website development and design solutions that convert visitors into customers.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250',
      link: '/website-development',
      bgGradient: 'from-cyan-500 via-blue-500 to-indigo-500'
    },
    {
      title: 'Shopify Development',
      description: 'Expert Shopify store development and customization for e-commerce success.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250',
      link: '/shopify-development',
      bgGradient: 'from-emerald-500 via-green-500 to-teal-500'
    },
    {
      title: 'Shopify Integration',
      description: 'Seamlessly integrate your Shopify store with marketplaces and third-party platforms.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250',
      link: '/shopify-integration',
      bgGradient: 'from-teal-500 via-cyan-500 to-blue-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm`}
            onClick={() => navigate(service.link)}
          >
            <div
              className={`h-48 rounded-t-xl bg-gradient-to-r ${service.bgGradient} flex items-center justify-center overflow-hidden`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardContent>
              <CardTitle className="text-xl font-bold text-slate-900 mb-2">{service.title}</CardTitle>
              <CardDescription className="text-slate-600 mb-4">{service.description}</CardDescription>
              <Button
                variant="outline"
                className="flex items-center justify-center w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(service.link);
                }}
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
