
import { useSupabasePolicyPages } from "@/hooks/useSupabasePolicyPages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const TermsConditions = () => {
  const { getPolicyPageByType, loading, error } = useSupabasePolicyPages();
  const policyContent = getPolicyPageByType('terms-conditions');

  if (loading) {
    return (
      <>
        <SEOHead title="Terms & Conditions" description="Terms and Conditions for Your Agency" />
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-12">
                <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto animate-pulse" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !policyContent) {
    return (
      <>
        <SEOHead title="Terms & Conditions" description="Terms and Conditions for Your Agency" />
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center">
                <p className="text-red-600">Failed to load terms and conditions: {error || 'Content not found'}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={policyContent.title}
        description="Terms and Conditions for Your Agency"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                {policyContent.title}
              </h1>
              <p className="text-slate-600">Last updated: {policyContent.last_updated}</p>
            </div>
            
            <div 
              className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: policyContent.content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
