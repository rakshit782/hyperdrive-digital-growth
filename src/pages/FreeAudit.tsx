
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Contact from "@/components/Contact";

const FreeAudit = () => {
  return (
    <>
      <SEOHead 
        title="Free Advertising Audit - AMZ AD SCOUT"
        description="Get a comprehensive free audit of your Amazon, Walmart, or Meta advertising accounts. Discover growth opportunities today."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Free Advertising Audit
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Get expert insights into your advertising performance and discover untapped opportunities.
            </p>
          </div>
        </section>
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default FreeAudit;
