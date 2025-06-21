
import Header from "@/components/Header";
import ModernHero from "@/components/ModernHero";
import ModernServices from "@/components/ModernServices";
import CircularReviews from "@/components/CircularReviews";
import ModernFeatures from "@/components/ModernFeatures";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Contact from "@/components/Contact";
import NewsletterForm from "@/components/NewsletterForm";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Expert Amazon, Walmart & Meta Advertising Agency | Drive Sales Growth"
        description="Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads. Boost your ROI with our proven strategies. Free audit available!"
        keywords="Amazon advertising, Walmart advertising, Meta ads, PPC management, e-commerce marketing, digital advertising agency"
      />
      <div className="min-h-screen">
        <Header />
        <ModernHero />
        <ModernServices />
        <ModernFeatures />
        <CircularReviews />
        <FAQ />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Stay Ahead of the Competition
              </h2>
              <p className="text-slate-600 mb-8">
                Get the latest advertising insights, tips, and strategies delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
        
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
