import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy | AMZ AD SCOUT"
        description="Privacy Policy for AMZ AD SCOUT - Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, user privacy, personal information"
        canonical={window.location.href}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-500 mb-12">Last updated: January 2025</p>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12 prose prose-slate max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We collect information you provide directly to us, including name, email address, and company information when you fill out our contact forms or sign up for our services. We may also collect information automatically when you visit our website, such as IP address, browser type, and pages visited.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Communicate with you about our services, updates, and promotional offers</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Analyze usage patterns to improve user experience</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Information Sharing</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy. We may share information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Data Security</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Cookies and Tracking</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Changes to This Policy</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Contact Us</h2>
                  <p className="text-slate-600 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at{" "}
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

export default Privacy;
