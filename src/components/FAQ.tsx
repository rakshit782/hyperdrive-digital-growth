
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How quickly can I see results from your advertising campaigns?",
    answer: "Most clients see initial improvements within 2-4 weeks, with significant results typically visible within 60-90 days. However, timelines can vary based on your current account status, competition, and budget.",
    isActive: true
  },
  {
    id: "2",
    question: "What makes your agency different from others?",
    answer: "We specialize exclusively in e-commerce advertising with a data-driven approach. Our team has managed over $50M in ad spend and focuses on profitable growth, not just traffic. We provide transparent reporting and dedicated account management.",
    isActive: true
  },
  {
    id: "3",
    question: "Do you guarantee results?",
    answer: "While we can't guarantee specific numbers due to market variables, we do guarantee our commitment to improving your performance. If you're not satisfied with our service within the first 60 days, we'll work with you to make it right.",
    isActive: true
  },
  {
    id: "4",
    question: "What platforms do you manage advertising on?",
    answer: "We manage advertising campaigns on Amazon, Walmart, Meta (Facebook & Instagram), and provide Shopify integration and development services. Our expertise spans the entire e-commerce advertising ecosystem.",
    isActive: true
  },
  {
    id: "5",
    question: "How much do your services cost?",
    answer: "Our pricing is customized based on your needs and ad spend. We offer both percentage-based and flat fee structures. Contact us for a free consultation to discuss pricing that fits your budget and goals.",
    isActive: true
  },
  {
    id: "6",
    question: "Do you work with businesses of all sizes?",
    answer: "Yes! We work with startups, growing businesses, and established brands. Our strategies are scalable and customized to your business size, goals, and budget.",
    isActive: true
  }
];

const FAQ = () => {
  const [faqs, setFAQs] = useState<FAQItem[]>(defaultFAQs);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log("FAQ: Component mounted, initializing...");
    
    const loadFAQs = () => {
      const savedFAQs = localStorage.getItem('faqData');
      if (savedFAQs) {
        try {
          const parsedData = JSON.parse(savedFAQs);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log("FAQ: Loaded from localStorage:", parsedData.length);
            setFAQs(parsedData.filter((faq: FAQItem) => faq.isActive));
          } else {
            console.log("FAQ: Invalid localStorage data, using defaults");
            setFAQs(defaultFAQs);
          }
        } catch (error) {
          console.error("FAQ: Error parsing saved FAQs:", error);
          setFAQs(defaultFAQs);
        }
      }
    };

    loadFAQs();

    const handleFAQUpdate = (event: CustomEvent) => {
      console.log("FAQ: Received update event:", event.detail);
      if (event.detail && Array.isArray(event.detail)) {
        setFAQs(event.detail.filter((faq: FAQItem) => faq.isActive));
      }
    };

    window.addEventListener('faqUpdated', handleFAQUpdate as EventListener);
    
    return () => {
      window.removeEventListener('faqUpdated', handleFAQUpdate as EventListener);
    };
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
            <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">FAQ</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about our services and how we can help grow your business.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card 
              key={faq.id} 
              className="group border border-slate-200/60 hover:border-blue-300/60 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-xl"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <Collapsible open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-blue-50/50 transition-colors duration-300 py-8">
                    <CardTitle className="flex items-center justify-between text-left">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-slate-900 font-bold text-xl leading-tight pr-4">{faq.question}</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                          <ChevronDown 
                            className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                              openItems[faq.id] ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-8">
                    <div className="ml-16 pr-14">
                      <div className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl border border-blue-100/50">
                        <p className="text-slate-700 leading-relaxed text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 mb-8">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-slate-700 font-medium">Still have questions? We're here to help!</span>
          </div>
          <div>
            <a
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Contact Us
              <MessageCircle className="w-5 h-5 ml-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
