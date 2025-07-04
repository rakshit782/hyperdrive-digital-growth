
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const AmazonAdvertising = () => {
  return (
    <>
      <SEOHead 
        title="Amazon Advertising Services - Expert PPC Management"
        description="Professional Amazon advertising services. Maximize your ROI with our expert PPC management, keyword optimization, and campaign strategies."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Amazon Advertising Services
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Drive sales and maximize ROI with our expert Amazon PPC management.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
              <p className="text-slate-600">
                Professional Amazon advertising management including Sponsored Products, Sponsored Brands, and DSP campaigns.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AmazonAdvertising;
