
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle } from "lucide-react";

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

    // Load FAQs on mount
    loadFAQs();

    // Listen for updates from dashboard
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
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our services and how we can help grow your business.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="border border-slate-200 hover:border-blue-300 transition-all duration-300">
              <Collapsible open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors duration-200">
                    <CardTitle className="flex items-center justify-between text-left">
                      <span className="text-slate-900 font-semibold">{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-blue-600 transition-transform duration-200 flex-shrink-0 ml-4 ${
                          openItems[faq.id] ? 'rotate-180' : ''
                        }`} 
                      />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
