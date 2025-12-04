import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <>
      <SEOHead 
        title="Terms & Conditions | AMZ AD SCOUT"
        description="Terms & Conditions for AMZ AD SCOUT - Review our service terms and user obligations."
        keywords="terms and conditions, service agreement, user terms, terms of service"
        canonical={window.location.href}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms & Conditions</h1>
            <p className="text-slate-500 mb-12">Last updated: January 2025</p>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12 prose prose-slate max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-slate-600 leading-relaxed">
                    By accessing and using the services provided by AMZ AD SCOUT, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Services Description</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ AD SCOUT provides digital marketing, advertising, and e-commerce solutions including but not limited to Amazon PPC management, Walmart advertising, Meta and Google ads management, listing optimization, and website development. We reserve the right to modify or discontinue services at any time with reasonable notice.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. User Obligations</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">By using our services, you agree to:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not use our services for any illegal or unauthorized purpose</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Payment Terms</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Payment is due according to the terms specified in your service agreement. All fees are non-refundable unless otherwise stated. We reserve the right to suspend services for non-payment after providing reasonable notice. Prices are subject to change with 30 days advance notice.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Intellectual Property</h2>
                  <p className="text-slate-600 leading-relaxed">
                    All content, trademarks, and other intellectual property on our website and in our services are owned by AMZ AD SCOUT or our licensors. You may not reproduce, distribute, or create derivative works without our express written permission.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Confidentiality</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Both parties agree to maintain the confidentiality of any proprietary information shared during the course of our business relationship. This includes business strategies, financial information, and any other information designated as confidential.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Limitation of Liability</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ AD SCOUT shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the services in question.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Termination</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Either party may terminate this agreement with 30 days written notice. We reserve the right to terminate services immediately for violation of these terms or non-payment.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Governing Law</h2>
                  <p className="text-slate-600 leading-relaxed">
                    These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be resolved through arbitration or in the courts of competent jurisdiction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Contact Information</h2>
                  <p className="text-slate-600 leading-relaxed">
                    For questions about these Terms & Conditions, please contact us at{" "}
                    <a href="mailto:info@amzadscout.com" className="text-primary hover:underline">
                      info@amzadscout.com
                    </a>
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Terms;
