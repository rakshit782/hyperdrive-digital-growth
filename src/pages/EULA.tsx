import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";

const EULA = () => {
  return (
    <>
      <SEOHead 
        title="End User License Agreement - AMZ CoPilot | AMZ AD SCOUT"
        description="End User License Agreement (EULA) for AMZ CoPilot - Amazon seller management app for listings, orders, inventory, and performance."
        keywords="EULA, end user license agreement, AMZ CoPilot, Amazon seller app, terms of use"
        canonical={window.location.href}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">End User License Agreement</h1>
            <p className="text-xl text-primary font-semibold mb-1">AMZ CoPilot</p>
            <p className="text-slate-500 mb-12">Last updated: April 2026</p>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12 prose prose-slate max-w-none">

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
                  <p className="text-slate-600 leading-relaxed">
                    This End User License Agreement ("Agreement") is a legal agreement between you ("User" or "You") and AMZ AD SCOUT ("Company," "We," or "Us") governing your use of <strong>AMZ CoPilot</strong> ("the App"), a software application designed to help Amazon sellers manage listings, orders, images, inventory, and performance in one centralized platform, making Amazon account operations more organized, efficient, and scalable.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    By installing, accessing, or using the App, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. If you do not agree to these terms, do not install or use the App.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. License Grant</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    Subject to the terms of this Agreement, the Company grants you a limited, non-exclusive, non-transferable, revocable license to use AMZ CoPilot solely for your internal business purposes in connection with managing your Amazon Seller account(s).
                  </p>
                  <p className="text-slate-600 leading-relaxed">You may NOT:</p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Copy, modify, distribute, sell, or lease any part of the App</li>
                    <li>Reverse engineer, decompile, or disassemble the App</li>
                    <li>Sublicense or transfer the App to any third party</li>
                    <li>Use the App for any unlawful purpose or in violation of Amazon's Terms of Service</li>
                    <li>Attempt to gain unauthorized access to any systems or networks connected to the App</li>
                    <li>Use the App to scrape, harvest, or collect data in violation of any applicable law</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. App Description & Features</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    AMZ CoPilot provides Amazon sellers with tools to streamline account operations, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li><strong>Listing Management:</strong> Create, edit, and optimize product listings in bulk</li>
                    <li><strong>Order Management:</strong> View, track, and manage orders from a unified dashboard</li>
                    <li><strong>Image Management:</strong> Upload, organize, and optimize product images</li>
                    <li><strong>Inventory Management:</strong> Monitor stock levels, set alerts, and manage replenishment</li>
                    <li><strong>Performance Analytics:</strong> Track key metrics, sales performance, and account health</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    Features may be updated, modified, or discontinued at any time at the Company's sole discretion.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Account & Access Requirements</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To use AMZ CoPilot, you must have an active Amazon Seller account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration and to keep it updated. The Company reserves the right to suspend or terminate access if fraudulent, abusive, or unauthorized activity is detected.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Collection & Privacy</h2>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    AMZ CoPilot may collect, process, and store certain data to provide its services, including:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Amazon Seller account data (listings, orders, inventory, performance metrics)</li>
                    <li>User account information (name, email, business details)</li>
                    <li>Usage analytics and app interaction data</li>
                    <li>Device and browser information for support and optimization</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-3">
                    All data is collected and processed in accordance with our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. We do not sell your personal data to third parties. Data is used solely to provide, improve, and support the App's functionality.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Amazon API & Compliance</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ CoPilot interacts with Amazon's Selling Partner API (SP-API) and other Amazon services. You acknowledge that your use of the App must comply with Amazon's Terms of Service, Acceptable Use Policy, and all applicable Amazon program policies. The Company is not responsible for any changes Amazon makes to its APIs, policies, or services that may affect the App's functionality.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-3 font-medium italic">
                    Disclaimer: AMZ CoPilot and AMZ AD SCOUT are not affiliated with, endorsed by, or sponsored by Amazon. Amazon is a registered trademark of Amazon.com, Inc.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Subscription & Payment</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Access to AMZ CoPilot may require a paid subscription. Pricing, billing cycles, and payment terms will be communicated at the time of purchase. All fees are non-refundable unless otherwise stated in our <a href="/refund-policy" className="text-primary hover:underline">Refund Policy</a>. The Company reserves the right to modify pricing with 30 days' advance notice. Failure to pay may result in suspension or termination of access.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Intellectual Property</h2>
                  <p className="text-slate-600 leading-relaxed">
                    All rights, title, and interest in and to AMZ CoPilot, including all intellectual property rights (software, design, logos, documentation, and content), are and shall remain the exclusive property of AMZ AD SCOUT. This Agreement does not grant you any ownership rights. Any feedback, suggestions, or improvements you provide may be used by the Company without obligation or compensation.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Disclaimer of Warranties</h2>
                  <p className="text-slate-600 leading-relaxed">
                    AMZ CoPilot is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted availability. The Company does not warrant that the App will be error-free, secure, or available at all times. Use of the App is at your own risk.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Limitation of Liability</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To the maximum extent permitted by applicable law, AMZ AD SCOUT shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, sales, or business opportunities arising from the use or inability to use AMZ CoPilot. Our total aggregate liability shall not exceed the amount you paid for the App in the twelve (12) months preceding the claim.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Indemnification</h2>
                  <p className="text-slate-600 leading-relaxed">
                    You agree to indemnify, defend, and hold harmless AMZ AD SCOUT and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses (including reasonable attorney's fees) arising from your use of the App, violation of this Agreement, or infringement of any third-party rights.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Termination</h2>
                  <p className="text-slate-600 leading-relaxed">
                    This Agreement is effective until terminated. You may terminate it at any time by uninstalling the App and ceasing all use. The Company may terminate or suspend your access immediately, without prior notice, if you breach any term of this Agreement. Upon termination, all licenses granted herein shall cease, and you must destroy all copies of the App in your possession.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Updates & Modifications</h2>
                  <p className="text-slate-600 leading-relaxed">
                    The Company may update or modify the App and this Agreement from time to time. Continued use of the App after changes constitutes acceptance of the updated terms. Material changes will be communicated through the App or via email. It is your responsibility to review this Agreement periodically.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Governing Law & Dispute Resolution</h2>
                  <p className="text-slate-600 leading-relaxed">
                    This Agreement shall be governed by and construed in accordance with applicable laws. Any disputes arising under or in connection with this Agreement shall be resolved through binding arbitration or in the courts of competent jurisdiction. Both parties agree to attempt good-faith negotiation before initiating formal proceedings.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">15. Severability</h2>
                  <p className="text-slate-600 leading-relaxed">
                    If any provision of this Agreement is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">16. Contact Information</h2>
                  <p className="text-slate-600 leading-relaxed">
                    For questions or concerns about this End User License Agreement or AMZ CoPilot, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                    <p className="text-slate-700 font-semibold">AMZ AD SCOUT</p>
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

export default EULA;
