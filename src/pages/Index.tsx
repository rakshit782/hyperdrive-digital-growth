
import React, { Suspense } from 'react';
import OptimizedHero from '@/components/OptimizedHero';
import OptimizedServices from '@/components/OptimizedServices';
import OptimizedReviews from '@/components/OptimizedReviews';
import CTA from '@/components/CTA'; // Changed to default import
import FAQ from '@/components/FAQ'; // Changed to default import
import { ScrollingLogos } from '@/components/AuthorizedPartners';
import ErrorBoundary from '@/components/ErrorBoundary'; // Changed to default import

// Loading fallback component
const LoadingFallback = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg flex items-center justify-center`}>
    <div className="text-slate-500 dark:text-slate-400">Loading...</div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <ErrorBoundary>
        {/* Hero Section */}
        <Suspense fallback={<LoadingFallback height="h-screen" />}>
          <OptimizedHero />
        </Suspense>

        {/* Partners/Logos Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback height="h-32" />}>
            <ScrollingLogos />
          </Suspense>
        </ErrorBoundary>

        {/* Services Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback height="h-96" />}>
            <OptimizedServices />
          </Suspense>
        </ErrorBoundary>

        {/* Reviews Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback height="h-96" />}>
            <OptimizedReviews />
          </Suspense>
        </ErrorBoundary>

        {/* CTA Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <CTA />
          </Suspense>
        </ErrorBoundary>

        {/* FAQ Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  );
};

export default Index;
