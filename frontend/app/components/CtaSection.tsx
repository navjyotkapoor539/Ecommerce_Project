import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-16 sm:py-24">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <Mail className="mx-auto h-12 w-12 text-primary-foreground/80" />
            <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Get 15% Off Your First Order
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
              Subscribe to our newsletter and be the first to know about new arrivals, 
              exclusive deals, and special promotions.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                variant="secondary"
                asChild 
                className="w-full bg-card text-foreground hover:bg-card/90 sm:w-auto"
              >
                <Link href="/register">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              >
                <Link href="/sale">Browse Deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
