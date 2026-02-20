import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Shield, RefreshCcw, CreditCard, Headphones, Gift } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $50. Fast and reliable shipping worldwide.",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is encrypted and secure with us.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy. No questions asked.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Pay with credit card, PayPal, or buy now and pay later.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is here to help you anytime.",
  },
  {
    icon: Gift,
    title: "Loyalty Rewards",
    description: "Earn points with every purchase and get exclusive discounts.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-card px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Shop With Us?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We make your shopping experience seamless, secure, and satisfying.
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="border-border bg-background transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
