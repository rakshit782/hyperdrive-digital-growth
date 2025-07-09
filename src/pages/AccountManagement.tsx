
import { Users, BarChart3, Target, Zap } from 'lucide-react';
import UnifiedServicePage from '@/components/UnifiedServicePage';

const AccountManagement = () => {
  const features = [
    {
      title: 'Account Optimization',
      description: 'Comprehensive account setup and optimization for maximum performance',
      icon: Target,
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Performance Monitoring',
      description: 'Real-time monitoring and reporting of all advertising campaigns',
      icon: BarChart3,
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Strategy Development',
      description: 'Custom advertising strategies tailored to your business goals',
      icon: Users,
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'Campaign Management',
      description: 'Day-to-day management of advertising campaigns across platforms',
      icon: Zap,
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  return (
    <UnifiedServicePage
      serviceType="account-management"
      title="Account Management Services"
      subtitle="Professional Ad Account Management & Optimization"
      heroDescription="Let our experts manage your advertising accounts while you focus on your business. We provide comprehensive account management, optimization, and strategic guidance for maximum ROI."
      primaryButtonText="Get Started"
      secondaryButtonText="View Services"
      primaryButtonUrl="/contact"
      secondaryButtonUrl="/case-studies"
      ctaTitle="Ready to Optimize Your Accounts?"
      ctaDescription="Let our experts take care of your advertising accounts while you focus on growing your business."
      ctaButtonText="Start Management Today"
      ctaButtonUrl="/contact"
      seoTitle="Account Management Services - Professional Ad Account Management"
      seoDescription="Professional advertising account management services. Comprehensive campaign management, optimization, and strategy development across all major platforms."
      heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center"
      heroImageAlt="Account Management Services"
      badgeText="Account Management Experts"
      badgeIcon="👥"
      gradientClass="bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20"
      primaryColor="indigo"
      secondaryColor="purple"
      features={features}
    />
  );
};

export default AccountManagement;
