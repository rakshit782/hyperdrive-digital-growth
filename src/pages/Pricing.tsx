import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { plans, loading } = usePricingPlans();
  const navigate = useNavigate();

  const handleGetStarted = (planName: string) => {
    navigate(`/contact?plan=${encodeURIComponent(planName)}`);
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
        title="Pricing Plans - AMZ Ad Scout"
        description="Choose the perfect plan for your marketplace advertising needs. From small businesses to enterprise-level brands."
        keywords="pricing, marketplace ads, Amazon ads pricing, advertising plans"
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
                    <Card key={i} className="flex flex-col">
                      <CardHeader>
                        <Skeleton className="h-8 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                      <CardContent className="flex-1">
                        <Skeleton className="h-12 w-40 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {plans
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((plan) => (
                      <Card
                        key={plan.id}
                        className={`flex flex-col relative ${
                          plan.is_popular
                            ? "border-primary shadow-lg shadow-primary/20 scale-105"
                            : "border-border"
                        }`}
                      >
                        {plan.is_popular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                            Most Popular
                          </div>
                        )}
                        
                        <CardHeader>
                          <CardTitle className="text-2xl">{plan.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {plan.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1">
                          <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-bold">
                                ${calculatePrice(plan.price).toLocaleString()}
                              </span>
                              <span className="text-muted-foreground">
                                /{isYearly ? "year" : "month"}
                              </span>
                            </div>
                            {isYearly && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Billed annually
                              </p>
                            )}
                          </div>

                          <ul className="space-y-3">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>

                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={plan.is_popular ? "default" : "outline"}
                            onClick={() => handleGetStarted(plan.name)}
                          >
                            Get Started
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              )}
            </div>
          </section>

          <section className="py-16 px-4 bg-muted/50">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find a plan that fits your needs? Contact us for a custom strategy 
                or private quote. Our experts can tailor ad management, automation, and 
                multi-marketplace integration around your exact business goals.
              </p>
              <Button size="lg" onClick={() => navigate("/contact")}>
                Contact Sales
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
