
import { ShoppingCart, TrendingUp, Target, BarChart3 } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const WalmartAdvertising = () => {
  const features = [
    {
      title: 'Walmart PPC Management',
      description: 'Strategic campaign optimization for maximum visibility and sales growth',
      icon: ShoppingCart,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Listing Optimization',
      description: 'Enhanced product listings that convert browsers into buyers',
      icon: TrendingUp,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Keyword Research',
      description: 'Advanced keyword targeting to reach your ideal customers',
      icon: Target,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights to optimize your campaigns',
      icon: BarChart3,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="walmart-advertising"
      title="Walmart Advertising Management"
      subtitle="Expert Walmart Connect & Marketplace Optimization"
      heroDescription="Dominate Walmart with strategic advertising campaigns and marketplace optimization. We help brands achieve exceptional ROI through expert Walmart Connect management and marketplace strategies."
      primaryButtonText="Get Free Walmart Audit"
      secondaryButtonText="View Success Stories"
      primaryButtonUrl="/free-audit"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Dominate Walmart?"
      ctaDescription="Get your free Walmart advertising audit and discover how we can maximize your marketplace ROI."
      ctaButtonText="Get Free Audit"
      ctaButtonUrl="/free-audit"
      seoTitle="Walmart Advertising Management - Expert Walmart Connect Services"
      seoDescription="Professional Walmart advertising management services. Dominate the marketplace with our proven advertising strategies and listing optimization expertise."
      heroImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Walmart Store and Shopping Experience"
      badgeText="Walmart Connect Certified"
      badgeIcon="🛒"
      gradientClass="bg-gradient-to-br from-blue-50 via-cyan-50/30 to-teal-50/20"
      primaryColor="blue"
      secondaryColor="cyan"
      features={features}
    />
  );
};

export default WalmartAdvertising;
