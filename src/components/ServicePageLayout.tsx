
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import StatsSection from './UnifiedServicePage/StatsSection';
import { useSupabaseStats } from '@/hooks/useSupabaseStats';

interface ServicePageLayoutProps {
  children: React.ReactNode;
  seoTitle: string;
  seoDescription: string;
  serviceType: string;
}

const ServicePageLayout = ({ 
  children, 
  seoTitle, 
  seoDescription, 
  serviceType 
}: ServicePageLayoutProps) => {
  const { stats, loading } = useSupabaseStats();

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main>
          {children}
          {!loading && stats.length > 0 && (
            <StatsSection 
              stats={stats.map(stat => ({
                id: stat.id,
                stat_value: stat.stat_value,
                stat_label: stat.stat_label,
                stat_description: stat.description || '',
                icon_name: stat.icon
              }))}
              primaryColor="blue"
              secondaryColor="indigo"
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ServicePageLayout;
