
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const ServicePage = () => {
  const { slug } = useParams();

  return (
    <>
      <SEOHead 
        title={`Service - ${slug}`}
        description={`Learn more about our ${slug} service`}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            Service: {slug}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-slate-600">
              This is a placeholder for the service page with slug: {slug}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
