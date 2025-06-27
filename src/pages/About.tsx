
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Users, Target, Award, CheckCircle } from "lucide-react";

interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  missionTitle: string;
  missionContent: string;
  visionTitle: string;
  visionContent: string;
  valuesTitle: string;
  values: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    heroTitle: "About Our Agency",
    heroSubtitle: "We're a team of digital marketing experts dedicated to scaling businesses through strategic advertising across Amazon, Walmart, and Meta platforms.",
    missionTitle: "Our Mission",
    missionContent: "To empower businesses of all sizes to achieve exceptional growth through data-driven advertising strategies and cutting-edge technology solutions.",
    visionTitle: "Our Vision",
    visionContent: "To become the leading digital advertising agency that transforms how businesses connect with their customers across all major e-commerce and social platforms.",
    valuesTitle: "Our Values",
    values: [
      {
        icon: "Target",
        title: "Results-Driven",
        description: "We focus on measurable outcomes and ROI for every campaign we manage."
      },
      {
        icon: "Users",
        title: "Client-Centric",
        description: "Your success is our success. We build long-term partnerships with our clients."
      },
      {
        icon: "Award",
        title: "Excellence",
        description: "We strive for excellence in every aspect of our service delivery."
      },
      {
        icon: "CheckCircle",
        title: "Transparency",
        description: "Complete transparency in our processes, reporting, and communication."
      }
    ]
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('aboutUsContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setAboutContent(parsed);
      } catch (error) {
        console.error('Failed to parse about content:', error);
      }
    }

    const handleContentUpdate = (event: CustomEvent) => {
      setAboutContent(event.detail);
    };

    window.addEventListener('aboutUsUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('aboutUsUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return Target;
      case 'Users': return Users;
      case 'Award': return Award;
      case 'CheckCircle': return CheckCircle;
      default: return Target;
    }
  };

  return (
    <>
      <SEOHead 
        title="About Us - Expert Digital Advertising Agency"
        description="Learn about our mission to help businesses grow through strategic Amazon, Walmart, and Meta advertising campaigns."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              {aboutContent.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              {aboutContent.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{aboutContent.missionTitle}</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{aboutContent.missionContent}</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{aboutContent.visionTitle}</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{aboutContent.visionContent}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-16">
              {aboutContent.valuesTitle}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutContent.values.map((value, index) => {
                const IconComponent = getIcon(value.icon);
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
