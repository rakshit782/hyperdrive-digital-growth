
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <SEOHead 
        title="Contact Us - Get Your Free Digital Marketing Consultation"
        description="Ready to grow your business? Contact AMZ AD SCOUT for expert digital marketing services and get your free consultation today."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Ready to grow your business? Let's discuss your digital marketing needs.
            </p>
          </div>
        </section>
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
