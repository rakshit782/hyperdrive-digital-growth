
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FreeAuditForm from "@/components/FreeAuditForm";

const FreeAudit = () => {
  return (
    <>
      <SEOHead 
        title="Free Advertising Audit - Get Your $2,000 Analysis"
        description="Get a comprehensive free audit of your advertising performance across Amazon, Walmart, and Meta platforms. Discover growth opportunities."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Get Your Free $2,000 Audit
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Discover hidden opportunities in your advertising campaigns and get a roadmap to increase your ROAS by 300%.
            </p>
          </div>
        </section>

        {/* Benefits Section - Now above the form */}
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                What You'll Get in Your Free Audit
              </h2>
              <p className="text-lg text-slate-600">
                Our comprehensive analysis includes everything you need to optimize your advertising performance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Performance Analysis</h3>
                <p className="text-slate-600">Complete breakdown of your current advertising performance with actionable insights.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Growth Opportunities</h3>
                <p className="text-slate-600">Identify untapped opportunities to scale your campaigns and increase ROAS.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-3 text-lg">Risk Assessment</h3>
                <p className="text-slate-600">Spot potential issues before they impact your advertising budget and performance.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200 text-center">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Trusted by 500+ Brands</h3>
              <p className="text-slate-700 mb-6 text-lg">
                Join successful e-commerce brands who've increased their ROAS by an average of 300% after implementing our audit recommendations.
              </p>
              <div className="flex items-center justify-center gap-8 text-slate-600 flex-wrap">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24-hour turnaround
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Actionable insights
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No commitment required
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section - Now centered and simplified */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-2xl mx-auto px-6">
            <FreeAuditForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FreeAudit;
