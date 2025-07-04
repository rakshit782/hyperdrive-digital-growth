
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
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Get Your Free $2,000 Audit
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Discover hidden opportunities in your advertising campaigns and get a roadmap to increase your ROAS by 300%.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <FreeAuditForm />
      </div>
      <Footer />
    </>
  );
};

export default FreeAudit;
