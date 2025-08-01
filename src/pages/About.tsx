
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const About = () => {
  return (
    <>
      <SEOHead 
        title="About AMZ AD SCOUT - Your Digital Marketing Partner"
        description="Learn about AMZ AD SCOUT, the leading digital marketing agency specializing in Amazon advertising, PPC management, and e-commerce growth solutions."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                About AMZ AD SCOUT
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                The Growth Agency specializing in Amazon advertising, digital marketing, and e-commerce solutions.
              </p>
            </div>
            
            <div className="prose prose-lg mx-auto text-slate-600">
              <p className="text-xl leading-relaxed mb-8">
                At AMZ AD SCOUT, we are passionate about helping businesses thrive in the digital marketplace. 
                Our team of experts combines years of experience with cutting-edge strategies to deliver exceptional results 
                for our clients across Amazon, Google, Meta, and other major advertising platforms.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                  <p>
                    To empower businesses with data-driven digital marketing solutions that drive growth, 
                    increase revenue, and maximize return on investment across all major advertising platforms.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                  <p>
                    To be the leading digital marketing agency that transforms how businesses approach 
                    online advertising and e-commerce growth through innovative strategies and exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default About;
