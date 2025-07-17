
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';

const ModernLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Index />
      </main>
      <Footer />
    </div>
  );
};

export default ModernLayout;
