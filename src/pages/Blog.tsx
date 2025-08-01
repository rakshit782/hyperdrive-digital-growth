
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Blog = () => {
  return (
    <>
      <SEOHead 
        title="Digital Marketing Blog - Expert Tips & Insights"
        description="Stay updated with the latest digital marketing trends, Amazon advertising tips, and e-commerce strategies from our expert team."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Digital Marketing Blog
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Expert insights, tips, and strategies for digital marketing success.
              </p>
            </div>
            
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 mb-8">
                Our blog is coming soon! We're working on bringing you the latest insights and strategies 
                in digital marketing, Amazon advertising, and e-commerce growth.
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Stay Tuned</h3>
                <p className="text-slate-600">
                  Subscribe to our newsletter to be the first to know when we publish new articles.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
