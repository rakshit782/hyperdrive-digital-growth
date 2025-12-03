import { useNavigate } from "react-router-dom";
import { Check, Target, Paintbrush, Brain, ShoppingCart, Users, Store, Plus, Calculator, Gift, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import pricingData from "@/data/pricingData.json";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="À La Carte Pricing Menu | AMZ AD SCOUT Services"
        description="Flexible & scalable service options for every stage of growth. Amazon PPC, Walmart Ads, Shopify development, listing optimization, and marketplace automation services."
        keywords="amazon ppc pricing, walmart ads pricing, shopify development pricing, listing optimization cost, marketplace automation, ecommerce marketing pricing"
        canonical={window.location.href}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto max-w-7xl text-center">
              <Badge variant="secondary" className="mb-4">À La Carte Services</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AMZ AD SCOUT – Pricing Menu
              </h1>
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
                Flexible & scalable service options for every stage of growth
              </p>
            </div>
          </section>

          {/* PPC Management Section */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl md:text-3xl">{pricingData.ppcManagement.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {pricingData.ppcManagement.subtitle}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2 bg-muted/50 p-3 rounded-lg">
                    📌 {pricingData.ppcManagement.note}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">SKU / Product Count</TableHead>
                          <TableHead className="text-center">1-Month</TableHead>
                          <TableHead className="text-center">3-Month</TableHead>
                          <TableHead className="text-center">6-Month</TableHead>
                          <TableHead className="text-center">12-Month</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pricingData.ppcManagement.tiers.map((tier, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{tier.skuRange}</TableCell>
                            <TableCell className="text-center">${tier.oneMonth}/mo</TableCell>
                            <TableCell className="text-center">${tier.threeMonth}/mo</TableCell>
                            <TableCell className="text-center">${tier.sixMonth}/mo</TableCell>
                            <TableCell className="text-center font-semibold text-primary">${tier.twelveMonth}/mo</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-4">Includes:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pricingData.ppcManagement.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-12 px-4 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Listing Services */}
                <ServiceCard 
                  icon={<Paintbrush className="h-6 w-6" />}
                  title={pricingData.listingServices.title}
                  services={pricingData.listingServices.services}
                />

                {/* Marketplace Intelligence */}
                <ServiceCard 
                  icon={<Brain className="h-6 w-6" />}
                  title={pricingData.marketplaceIntelligence.title}
                  services={pricingData.marketplaceIntelligence.services}
                />

                {/* Shopify Development */}
                <ServiceCard 
                  icon={<ShoppingCart className="h-6 w-6" />}
                  title={pricingData.shopifyDevelopment.title}
                  services={pricingData.shopifyDevelopment.services}
                />

                {/* Account Management */}
                <ServiceCard 
                  icon={<Users className="h-6 w-6" />}
                  title={pricingData.accountManagement.title}
                  services={pricingData.accountManagement.services}
                />

                {/* Walmart Ads */}
                <ServiceCard 
                  icon={<Store className="h-6 w-6" />}
                  title={pricingData.walmartAds.title}
                  services={pricingData.walmartAds.services}
                />

                {/* Add-Ons */}
                <ServiceCard 
                  icon={<Plus className="h-6 w-6" />}
                  title={pricingData.addOns.title}
                  services={pricingData.addOns.services}
                />
              </div>
            </div>
          </section>

          {/* Example Scenarios */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl md:text-2xl">{pricingData.examples.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Example Client</TableHead>
                          <TableHead>Selected Services</TableHead>
                          <TableHead className="text-right">Final Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pricingData.examples.scenarios.map((scenario, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{scenario.client}</TableCell>
                            <TableCell className="text-muted-foreground">{scenario.services}</TableCell>
                            <TableCell className="text-right font-semibold text-primary">{scenario.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contract Incentives */}
          <section className="py-12 px-4 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Gift className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl md:text-2xl">{pricingData.contractIncentives.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {pricingData.contractIncentives.plans.map((plan, idx) => (
                      <Card key={idx} className={idx === 2 ? "border-primary bg-primary/5" : ""}>
                        <CardContent className="pt-6 text-center">
                          <h4 className="font-bold text-lg">{plan.plan}</h4>
                          <p className="text-2xl font-bold text-primary my-2">{plan.discount}</p>
                          <p className="text-sm text-muted-foreground">{plan.notes}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      Minimum allowed PPC price: <span className="font-bold text-foreground">{pricingData.contractIncentives.minimumPrice}</span> ({pricingData.contractIncentives.minimumNote})
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Performance Guarantee */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{pricingData.guarantee.title}</h3>
                      <p className="text-lg text-muted-foreground">
                        📌 {pricingData.guarantee.text}
                      </p>
                    </div>
                    <Button size="lg" onClick={() => navigate('/contact')}>
                      Get Started Today
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 px-4 bg-primary text-primary-foreground">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Scale Your Business?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Contact us today for a custom quote tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/contact')}
                >
                  Contact Sales
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => navigate('/services')}
                >
                  View All Services
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  services: Array<{
    name: string;
    description?: string;
    pricing: string;
  }>;
}

const ServiceCard = ({ icon, title, services }: ServiceCardProps) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b last:border-0 last:pb-0">
            <div>
              <p className="font-medium">{service.name}</p>
              {service.description && (
                <p className="text-sm text-muted-foreground">{service.description}</p>
              )}
            </div>
            <Badge variant="secondary" className="shrink-0 w-fit">
              {service.pricing}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default Pricing;
