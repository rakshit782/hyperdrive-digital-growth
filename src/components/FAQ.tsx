
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from "lucide-react";
import { useSupabaseFAQs } from "@/hooks/useSupabaseFAQs";

const FAQ = () => {
  const { faqs, loading, error } = useSupabaseFAQs();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load FAQs: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-4">
            <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our services and how we can help grow your business.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={faq.id} 
              className="group border border-slate-200/60 hover:border-blue-300/60 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:shadow-lg"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <Collapsible open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-blue-50/50 transition-colors duration-300 py-6">
                    <CardTitle className="flex items-center justify-between text-left">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-slate-900 font-semibold text-lg leading-tight pr-4">{faq.question}</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                          <ChevronDown 
                            className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${
                              openItems[faq.id] ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-6">
                    <div className="ml-13 pr-12">
                      <div className="p-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl border border-blue-100/50">
                        <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-slate-700 font-medium">Still have questions? We're here to help!</span>
          </div>
          <div>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Contact Us
              <MessageCircle className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FAQ };
export default FAQ;
