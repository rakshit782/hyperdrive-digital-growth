
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Welcome - Simple Business Website"
        description="A clean and simple business website template"
        keywords="business, website, template, simple"
      />
      <div className="min-h-screen">
        <Header />
        
        {/* Simple Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Welcome to Our Business
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              A simple and clean website ready for your content.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
