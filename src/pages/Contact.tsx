
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <SEOHead 
        title="Contact Us - Get Your Free Advertising Audit"
        description="Ready to scale your business? Contact our team for a free advertising audit and consultation."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Let's Grow Your Business
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Ready to scale your advertising? Get in touch for a free consultation and see how we can help you achieve your goals.
            </p>
          </div>
        </section>

        {/* Contact Component */}
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
