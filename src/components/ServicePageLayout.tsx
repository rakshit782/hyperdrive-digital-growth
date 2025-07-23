
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import ServiceStats from './ServiceStats';

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
  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main>
          {children}
          <ServiceStats serviceType={serviceType} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ServicePageLayout;
