
import { lazy } from 'react';

// Dashboard components
export const StatsTab = lazy(() => import('@/components/dashboard/StatsTab'));
export const CaseStudiesTab = lazy(() => import('@/components/dashboard/CaseStudiesTab'));
export const BlogTab = lazy(() => import('@/components/dashboard/BlogTab'));
export const PricingTab = lazy(() => import('@/components/dashboard/PricingTab'));
export const SEOTab = lazy(() => import('@/components/dashboard/SEOTab'));
export const IntegrationsTab = lazy(() => import('@/components/dashboard/IntegrationsTab'));
export const EmailTab = lazy(() => import('@/components/dashboard/EmailTab'));
export const LeadsTab = lazy(() => import('@/components/dashboard/LeadsTab'));
export const MediaTab = lazy(() => import('@/components/dashboard/MediaTab'));
export const ContactTab = lazy(() => import('@/components/dashboard/ContactTab'));
export const WebsiteSettingsTab = lazy(() => import('@/components/dashboard/WebsiteSettingsTab'));

// Homepage components
export const Stats = lazy(() => import('@/components/Stats'));
export const CaseStudies = lazy(() => import('@/components/CaseStudies'));
export const Contact = lazy(() => import('@/components/Contact'));

// Performance optimization function
export const initializePerformanceOptimizations = () => {
  // Add any performance optimizations here
  console.log('Performance optimizations initialized');
};
