import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePricingPlans } from "@/hooks/usePricingPlans";
import { Skeleton } from "@/components/ui/skeleton";

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const { plans, loading } = usePricingPlans();

  const handleGetStarted = (planName: string) => {
    navigate('/contact');
  };

  const calculatePrice = (monthlyPrice: number) => {
    if (isYearly) {
      return Math.round(monthlyPrice * 10);
    }
    return monthlyPrice;
  };

  return (
    <>
      <SEOHead
        title="Transparent Pricing Plans | Amazon & E-commerce Marketing Services"
        description="Flexible pricing plans for Amazon PPC management, Walmart advertising, Shopify development, and e-commerce marketing services. From startups to enterprise brands, choose the perfect plan for your marketplace advertising needs with no hidden fees."
        keywords="amazon advertising pricing, amazon ppc management cost, walmart advertising pricing, shopify development pricing, e-commerce marketing pricing, marketplace advertising cost, ppc management pricing, digital marketing pricing, amazon agency pricing, flexible pricing plans, monthly advertising plans, annual advertising plans, startup marketing plans, enterprise marketing pricing, small business advertising cost, marketplace management pricing, campaign management cost, listing optimization pricing, conversion optimization cost, roi optimization pricing, consulting services pricing, account management cost, seasonal campaign pricing, performance marketing pricing, growth strategy pricing, transparent pricing, no hidden fees, scalable pricing, affordable amazon management, professional ppc pricing, certified agency pricing, data-driven marketing cost, multi-marketplace pricing, international expansion pricing, account health pricing, review management cost, ranking services pricing, product launch pricing, advertising budget planning"
        canonical={window.location.href}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto max-w-7xl text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Choose the perfect plan for your marketplace advertising needs. 
                Scale as you grow, with no hidden fees.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-12">
                <Label htmlFor="billing-toggle" className="text-base">
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <Label htmlFor="billing-toggle" className="text-base">
                  Yearly
                  <span className="ml-2 text-sm text-primary font-semibold">
                    Save 2 months!
                  </span>
                </Label>
              </div>
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="container mx-auto max-w-7xl">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[600px] w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className={`relative ${plan.is_popular ? 'border-primary shadow-lg' : ''}`}
                    >
                      {plan.is_popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-6">
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl font-bold">
                              ${calculatePrice(plan.price)}
                            </span>
                            <span className="text-muted-foreground">
                              / {isYearly ? 'year' : 'month'}
                            </span>
                          </div>
                          {isYearly && (
                            <p className="text-sm text-muted-foreground mt-2">
                              ${plan.price}/month billed annually
                            </p>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, idx) => {
                            const featureText = typeof feature === 'string' ? feature : feature.text;
                            return (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{featureText}</span>
                              </li>
                            );
                          })}
                        </ul>

                        {plan.addons && plan.addons.length > 0 && (
                          <div className="mb-6 pt-4 border-t">
                            <p className="text-sm font-semibold mb-3">Add-ons:</p>
                            <ul className="space-y-2">
                              {plan.addons.map((addon, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center justify-between">
                                  <span>{addon.name}</span>
                                  <span className="font-semibold">+${addon.price}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full"
                          variant={plan.is_popular ? 'default' : 'outline'}
                          onClick={() => handleGetStarted(plan.name)}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {/* Custom Solution Card */}
              <div className="mt-12">
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl mb-2">Need a Custom Solution?</CardTitle>
                    <CardDescription className="text-lg">
                      We offer tailored packages for unique business needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Our enterprise solutions are designed for businesses with specific requirements, 
                      multiple marketplaces, or unique challenges. Let's discuss how we can help you achieve your goals.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Custom integrations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Dedicated team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Priority support</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button size="lg" onClick={() => navigate('/contact')}>
                      Contact Sales
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
