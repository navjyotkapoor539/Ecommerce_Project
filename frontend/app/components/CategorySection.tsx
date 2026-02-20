import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shirt, Smartphone, Footprints } from "lucide-react";

const categories = [
  {
    name: "Clothes",
    description: "Trendy apparel for every occasion",
    href: "/category/clothes",
    icon: Shirt,
    itemCount: "2,500+ items",
  },
  {
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    href: "/category/electronics",
    icon: Smartphone,
    itemCount: "1,800+ items",
  },
  {
    name: "FootWears",
    description: "Footwear for style and comfort",
    href: "/category/footwears",
    icon: Footprints,
    itemCount: "3,200+ items",
  },
];

export function CategoriesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our wide range of products across three main categories
          </p>
        </div>

        {/* Categories grid */}
        <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <Card className="h-full overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  {/* Icon container */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <category.icon className="h-10 w-10 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mt-6 text-2xl font-bold text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    {category.itemCount}
                  </p>
                  
                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    Browse {category.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
