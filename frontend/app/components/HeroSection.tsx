import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent, Sparkles, Truck, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-background">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:shadow-md transition-shadow">
            <Percent className="h-4 w-4 text-primary animate-pulse" />
            <span>Winter Sale - Up to 50% Off</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
            Discover Your{" "}
            <span className="relative">
              <span className="text-primary">Perfect Style</span>
              <span className="absolute inset-0 bg-primary/10 blur-lg -z-10 rounded" />
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Shop the latest trends in fashion, electronics, and footwear with unbeatable prices and fast delivery straight to your door.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
              <Link href="/sale" className="flex items-center gap-2">
                View Sale Items
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trusted by customers worldwide</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {/* Reviews */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-primary/30 shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">10,000+</p>
                  <p className="text-sm text-muted-foreground">Happy Reviews</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>

              {/* Fast Delivery */}
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Free</p>
                  <p className="text-sm text-muted-foreground">Fast Shipping</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Secure Payments
              </div>
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
