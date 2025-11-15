import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

const FAQSection = () => {
  useEffect(() => {
    // Add FAQ Schema for SEO
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes your Amazon advertising agency different from Helium 10 or Jungle Scout?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While Helium 10, Jungle Scout, AMZ Scout, and Smart Scout are excellent tools for product research and data analytics, we are a full-service Amazon advertising agency that provides hands-on PPC management, strategy development, and optimization. We use data from these tools combined with our 10+ years of expertise to deliver superior advertising results and ROI for Amazon sellers."
          }
        },
        {
          "@type": "Question",
          "name": "Why choose a digital marketing agency over using tools like AMZ Scout or Smart Scout?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tools like AMZ Scout and Smart Scout provide valuable data, but they don't execute campaigns or develop strategies. As a specialized digital marketing agency and Amazon agency, we provide end-to-end campaign management, creative development, A/B testing, and continuous optimization that tools alone cannot deliver. We combine technology with human expertise for maximum results."
          }
        },
        {
          "@type": "Question",
          "name": "What Amazon advertising services does your advertising agency provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Amazon advertising agency provides comprehensive services including Amazon PPC management, Sponsored Products optimization, Sponsored Brands campaigns, Amazon DSP advertising, listing optimization, A+ content creation, and full marketplace strategy. We also offer Walmart advertising, Shopify development, and multi-channel integration services."
          }
        },
        {
          "@type": "Question",
          "name": "How does your Amazon agency compare to using Helium 10 or Jungle Scout independently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Helium 10 and Jungle Scout are powerful research tools, but our Amazon agency provides strategic expertise, campaign execution, and ongoing optimization that tools cannot. We leverage data from multiple sources including these platforms, combined with proprietary strategies developed over 10+ years managing $50M+ in ad spend. Think of us as your expert team using the best tools, not just the tools themselves."
          }
        },
        {
          "@type": "Question",
          "name": "What results can I expect from your digital marketing agency services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our digital marketing agency clients typically see 200-400% ROI improvements, 40-60% reduction in ACoS, and 2-5x sales growth within 90 days. We've managed 500+ successful campaigns and $50M+ in advertising spend across Amazon, Walmart, and other platforms. Results vary based on your product category, competition, and current optimization level."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer alternatives to AMZ Scout and Smart Scout for product research?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, as part of our Amazon agency services, we provide comprehensive market research and competitive analysis using multiple premium tools including alternatives to AMZ Scout and Smart Scout. Our approach combines tool data with expert human analysis to identify high-potential opportunities and develop winning strategies for your Amazon business."
          }
        }
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"][data-faq]');
    if (script) {
      script.textContent = JSON.stringify(faqSchema);
    } else {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-faq', 'true');
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"][data-faq]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Learn why our Amazon advertising agency delivers better results than tools alone
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 px-6">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
              What makes your Amazon advertising agency different from Helium 10 or Jungle Scout?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
              While Helium 10, Jungle Scout, AMZ Scout, and Smart Scout are excellent tools for product research and data analytics, we are a full-service <strong>Amazon advertising agency</strong> that provides hands-on PPC management, strategy development, and optimization. We use data from these tools combined with our 10+ years of expertise to deliver superior advertising results and ROI for Amazon sellers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 px-6">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
              Why choose a digital marketing agency over using tools like AMZ Scout or Smart Scout?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
              Tools like <strong>AMZ Scout</strong> and <strong>Smart Scout</strong> provide valuable data, but they don't execute campaigns or develop strategies. As a specialized <strong>digital marketing agency</strong> and <strong>Amazon agency</strong>, we provide end-to-end campaign management, creative development, A/B testing, and continuous optimization that tools alone cannot deliver. We combine technology with human expertise for maximum results.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 px-6">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
              What Amazon advertising services does your advertising agency provide?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
              Our <strong>Amazon advertising agency</strong> provides comprehensive services including Amazon PPC management, Sponsored Products optimization, Sponsored Brands campaigns, Amazon DSP advertising, listing optimization, A+ content creation, and full marketplace strategy. We also offer Walmart advertising, Shopify development, and multi-channel integration services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 px-6">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
              How does your Amazon agency compare to using Helium 10 or Jungle Scout independently?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
              <strong>Helium 10</strong> and <strong>Jungle Scout</strong> are powerful research tools, but our <strong>Amazon agency</strong> provides strategic expertise, campaign execution, and ongoing optimization that tools cannot. We leverage data from multiple sources including these platforms, combined with proprietary strategies developed over 10+ years managing $50M+ in ad spend. Think of us as your expert team using the best tools, not just the tools themselves.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 px-6">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
              What results can I expect from your digital marketing agency services?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
              Our <strong>digital marketing agency</strong> clients typically see 200-400% ROI improvements, 40-60% reduction in ACoS, and 2-5x sales growth within 90 days. We've managed 500+ successful campaigns and $50M+ in advertising spend across Amazon, Walmart, and other platforms. Results vary based on your product category, competition, and current optimization level.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 px-6">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
              Do you offer alternatives to AMZ Scout and Smart Scout for product research?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6 text-base leading-relaxed">
              Yes, as part of our <strong>Amazon agency</strong> services, we provide comprehensive market research and competitive analysis using multiple premium tools including alternatives to <strong>AMZ Scout</strong> and <strong>Smart Scout</strong>. Our approach combines tool data with expert human analysis to identify high-potential opportunities and develop winning strategies for your Amazon business.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
