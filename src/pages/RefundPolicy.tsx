import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const RefundPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Refund Policy | AMZ AD SCOUT"
        description="Refund Policy for AMZ AD SCOUT - Learn about our refund eligibility, process, and timeline."
        keywords="refund policy, money back guarantee, refund eligibility, cancellation policy"
        canonical={window.location.href}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Refund Policy</h1>
            <p className="text-slate-500 mb-12">Last updated: January 2025</p>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12 prose prose-slate max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Refund Eligibility</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We offer refunds within 30 days of service purchase if you are not satisfied with our services. To be eligible for a refund, you must have used our services and provided feedback on areas of concern before requesting a refund.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Non-Refundable Services</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">The following services are non-refundable:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Custom development work that has been completed and delivered</li>
                    <li>Third-party advertising spend (Amazon, Google, Meta ad credits)</li>
                    <li>Services rendered beyond the initial trial or setup period</li>
                    <li>Consultation fees once the consultation has been provided</li>
                    <li>Any services explicitly marked as non-refundable in the service agreement</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Refund Process</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">To request a refund:</p>
                  <ol className="list-decimal pl-6 text-slate-600 space-y-2">
                    <li>Contact our support team at info@amzadscout.com</li>
                    <li>Provide your order details and invoice number</li>
                    <li>Explain the reason for your refund request</li>
                    <li>Our team will review your request within 5 business days</li>
                    <li>You will receive a confirmation email with the decision</li>
                  </ol>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Processing Time</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Approved refunds will be processed within 5-10 business days and credited to your original payment method. Please note that your bank or credit card company may take additional time to process the refund on their end.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Partial Refunds</h2>
                  <p className="text-slate-600 leading-relaxed">
                    In some cases, we may offer partial refunds based on the services utilized and time elapsed. The partial refund amount will be calculated based on the proportion of services not yet delivered or utilized.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Performance Guarantee</h2>
                  <p className="text-slate-600 leading-relaxed">
                    If performance does not improve within 60 days of starting our PPC management services, we will continue working free of charge until improvement is achieved. This guarantee is subject to compliance with our recommended strategies and reasonable cooperation.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Cancellation Policy</h2>
                  <p className="text-slate-600 leading-relaxed">
                    You may cancel your subscription or service agreement at any time with 30 days written notice. Cancellation does not automatically entitle you to a refund for services already rendered or in progress.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Dispute Resolution</h2>
                  <p className="text-slate-600 leading-relaxed">
                    If you have concerns about a refund decision, please contact us to discuss resolution options. We are committed to ensuring customer satisfaction and will work with you to find a fair resolution.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Contact Us</h2>
                  <p className="text-slate-600 leading-relaxed">
                    For refund inquiries, please email us at{" "}
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

export default RefundPolicy;
