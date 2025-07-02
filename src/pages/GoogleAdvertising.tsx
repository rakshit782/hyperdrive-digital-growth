
import React from 'react';
import ServicePageLayout from '@/components/ServicePageLayout';
import { useServicePageConfig } from '@/hooks/useServicePageConfig';
import { useServiceData } from '@/hooks/useServiceData';

const GoogleAdvertising = () => {
  const { configs, loading: configLoading } = useServicePageConfig();
  const { stats, caseStudies, reviews, loading: dataLoading } = useServiceData('google-advertising');
  
  const config = configs['google-advertising'] || configs['google'] || {
    title: 'Google Advertising Management',
    subtitle: 'Expert Google Ads & Search Marketing',
    heroDescription: 'Drive targeted traffic and conversions with strategic Google Ads campaigns. We help businesses achieve exceptional ROI through expert PPC management and search marketing optimization.',
    primaryButtonText: 'Get Free Google Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    services: [
      {
        title: 'Google Ads Management',
        description: 'Strategic campaign setup and optimization for maximum ROI and visibility.',
        icon: 'Target',
        gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Search Engine Marketing',
        description: 'Comprehensive SEM strategies to dominate search results.',
        icon: 'Search',
        gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Keyword Research',
        description: 'Advanced keyword analysis to target high-converting search terms.',
        icon: 'FileText',
        gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
      },
      {
        title: 'Performance Analytics',
        description: 'Detailed reporting and insights to optimize campaign performance.',
        icon: 'BarChart3',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
      }
    ],
    benefits: [
      {
        title: 'High ROI',
        description: '450% average return on ad spend across all Google campaigns.',
        icon: 'DollarSign',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500'
      },
      {
        title: 'Expert Management',
        description: 'Google certified specialists managing your campaigns 24/7.',
        icon: 'Users',
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
      },
      {
        title: 'Conversion Focus',
        description: '60% average improvement in conversion rates.',
        icon: 'TrendingUp',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500'
      },
      {
        title: 'Quality Score',
        description: '8.5+ average quality score across all managed accounts.',
        icon: 'Star',
        color: 'bg-gradient-to-r from-orange-500 to-red-500'
      }
    ],
    ctaTitle: 'Ready to Dominate Google Search?',
    ctaDescription: 'Get your free Google Ads audit and discover how we can maximize your search marketing ROI.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/free-audit'
  };

  const loading = configLoading || dataLoading;

  return (
    <ServicePageLayout
      title={config.title}
      subtitle={config.subtitle}
      heroDescription={config.heroDescription}
      primaryButtonText={config.primaryButtonText}
      secondaryButtonText={config.secondaryButtonText}
      primaryButtonUrl={config.primaryButtonUrl}
      secondaryButtonUrl={config.secondaryButtonUrl}
      stats={stats}
      caseStudies={caseStudies}
      reviews={reviews}
      services={config.services}
      benefits={config.benefits}
      ctaTitle={config.ctaTitle}
      ctaDescription={config.ctaDescription}
      ctaButtonText={config.ctaButtonText}
      ctaButtonUrl={config.ctaButtonUrl}
      loading={loading}
    />
  );
};

export default GoogleAdvertising;
