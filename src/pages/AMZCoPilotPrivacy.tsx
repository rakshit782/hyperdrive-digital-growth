import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const AMZCoPilotPrivacy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - AMZ CoPilot | AMZ AD SCOUT"
        description="Privacy Policy for AMZ CoPilot - Learn how we collect, use, and protect your data when using our Amazon seller management app."
        keywords="privacy policy, AMZ CoPilot, Amazon seller app, data protection, data privacy"
        canonical={window.location.href}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-xl text-primary font-semibold mb-1">AMZ CoPilot</p>
            <p className="text-slate-500 mb-12">Last updated: April 2026</p>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12 prose prose-slate max-w-none">

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ AD SCOUT ("Company," "We," "Us," or "Our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use <strong>AMZ CoPilot</strong> ("the App"), a software application that helps Amazon sellers manage listings, orders, images, inventory, and performance in one centralized platform.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    By using AMZ CoPilot, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use the App.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
                  
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">2.1 Information You Provide</h3>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, company name, phone number, and billing details when you register or subscribe</li>
                    <li><strong>Amazon Seller Credentials:</strong> Amazon Seller Central API credentials (MWS Auth Token, Seller ID, or SP-API credentials) required to connect your Amazon account</li>
                    <li><strong>Support Communications:</strong> Information you provide when contacting our support team, including chat logs and email correspondence</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">2.2 Information Collected Automatically</h3>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Amazon Account Data:</strong> Product listings, catalog data, order information, inventory levels, pricing data, images, and performance metrics retrieved through Amazon's Selling Partner API (SP-API)</li>
                    <li><strong>Usage Data:</strong> Features accessed, actions performed, time spent, and interaction patterns within the App</li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and screen resolution</li>
                    <li><strong>Log Data:</strong> Access times, pages viewed, error logs, and referring URLs</li>
                    <li><strong>Cookies & Tracking:</strong> Session cookies, authentication tokens, and analytics identifiers</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">We use the collected information for the following purposes:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Service Delivery:</strong> To provide, operate, and maintain AMZ CoPilot's features including listing management, order tracking, inventory monitoring, and performance analytics</li>
                    <li><strong>Account Management:</strong> To create and manage your account, process payments, and communicate about your subscription</li>
                    <li><strong>Product Improvement:</strong> To analyze usage patterns, identify bugs, and develop new features and improvements</li>
                    <li><strong>Automation Services:</strong> To execute repricing rules, inventory alerts, advertising automation, and other automated operations you configure</li>
                    <li><strong>Communication:</strong> To send service updates, security alerts, technical notices, and support responses</li>
                    <li><strong>Compliance:</strong> To comply with legal obligations, enforce our terms, and protect against fraud or abuse</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Amazon Data Usage</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    AMZ CoPilot accesses your Amazon Seller account data through Amazon's Selling Partner API (SP-API). We want to be transparent about how this data is handled:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Amazon data is used <strong>exclusively</strong> to provide you with the App's services and features</li>
                    <li>We do <strong>not</strong> sell, rent, or share your Amazon data with third parties for marketing purposes</li>
                    <li>We do <strong>not</strong> use your Amazon data to compete with your business</li>
                    <li>Amazon data is stored securely with encryption at rest and in transit</li>
                    <li>You may revoke API access at any time through your Amazon Seller Central account</li>
                    <li>Upon account termination, your Amazon data will be deleted within 30 days</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-3 font-medium italic">
                    AMZ CoPilot complies with Amazon's Acceptable Use Policy and Data Protection Policy for SP-API developers.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Sharing & Disclosure</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">We may share your information only in the following circumstances:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our services (hosting, payment processing, analytics), bound by confidentiality agreements</li>
                    <li><strong>Legal Compliance:</strong> When required by law, subpoena, court order, or governmental regulation</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with prior notice</li>
                    <li><strong>Protection:</strong> To protect the rights, property, or safety of AMZ AD SCOUT, our users, or the public</li>
                    <li><strong>With Your Consent:</strong> When you explicitly authorize sharing with a specific third party</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Data Security</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>AES-256 encryption for data at rest</li>
                    <li>TLS 1.2+ encryption for data in transit</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and role-based permissions for internal staff</li>
                    <li>Multi-factor authentication for administrative access</li>
                    <li>Automated threat detection and monitoring</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but will notify you promptly in the event of a data breach.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Data Retention</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We retain your personal information for as long as your account is active or as needed to provide services. After account termination or deletion request, we will delete or anonymize your data within 30 days, except where retention is required by law or for legitimate business purposes (e.g., fraud prevention, dispute resolution). Amazon marketplace data synced through SP-API is retained only while your account is active and the API connection is authorized.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Your Rights & Choices</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">Depending on your jurisdiction, you may have the following rights:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                    <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
                    <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                    <li><strong>Revoke API Access:</strong> Disconnect your Amazon account from AMZ CoPilot at any time via Seller Central</li>
                    <li><strong>Cookie Preferences:</strong> Manage cookie settings through your browser</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    To exercise any of these rights, contact us at <a href="mailto:info@amzadscout.com" className="text-primary hover:underline">info@amzadscout.com</a>. We will respond within 30 days.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Cookies & Tracking Technologies</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">AMZ CoPilot uses the following types of cookies:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for authentication, security, and basic app functionality</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how users interact with the App to improve performance</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    We do not use advertising or third-party tracking cookies. You can manage cookie preferences through your browser settings, though disabling essential cookies may affect App functionality.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. International Data Transfers</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including standard contractual clauses and compliance with applicable data protection regulations (GDPR, CCPA, etc.), to protect your data during international transfers.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Children's Privacy</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ CoPilot is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 18, we will take steps to delete such information promptly.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Third-Party Links & Services</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ CoPilot may contain links to third-party websites or integrate with third-party services (e.g., Amazon Seller Central, payment processors). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Changes to This Policy</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. Material changes will be communicated through the App or via email. The "Last updated" date at the top indicates when the policy was last revised. Continued use of AMZ CoPilot after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Contact Us</h2>
                  <p className="text-slate-600 leading-relaxed">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                    <p className="text-slate-700 font-semibold">AMZ AD SCOUT — AMZ CoPilot Privacy Team</p>
                    <p className="text-slate-600">
                      Email: <a href="mailto:info@amzadscout.com" className="text-primary hover:underline">info@amzadscout.com</a>
                    </p>
                    <p className="text-slate-600">
                      Website: <a href="/" className="text-primary hover:underline">www.amzadscout.com</a>
                    </p>
                  </div>
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

export default AMZCoPilotPrivacy;
