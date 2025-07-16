
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ModernHero from "@/components/ModernHero";
import ModernServices from "@/components/ModernServices";
import ModernFeatures from "@/components/ModernFeatures";
import ModernReviews from "@/components/ModernReviews";
import AuthorizedPartners from "@/components/AuthorizedPartners";
import Clientele from "@/components/Clientele";
import ModernCTA from "@/components/ModernCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Professional Digital Marketing Agency | Amazon, Walmart, Meta Advertising"
        description="Transform your business with our expert digital marketing services. Specializing in Amazon advertising, Walmart marketplace, Meta ads, and Shopify development."
        path="/"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header />
        <ModernHero />
        <ModernServices />
        <ModernFeatures />
        <ModernReviews />
        <AuthorizedPartners />
        <Clientele />
        <FAQ category="general" limit={6} />
        <ModernCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
