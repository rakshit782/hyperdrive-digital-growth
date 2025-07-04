
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Blog = () => {
  return (
    <>
      <SEOHead 
        title="Blog - AMZ AD SCOUT"
        description="Latest insights and tips on Amazon advertising, Walmart advertising, Meta ads, and ecommerce growth strategies."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Stay updated with the latest strategies and insights in digital advertising.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
              <p className="text-slate-600">
                Coming soon - Expert insights on Amazon advertising, Walmart advertising, Meta ads, and more.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
