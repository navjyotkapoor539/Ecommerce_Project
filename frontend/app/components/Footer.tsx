import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "Clothes", href: "/category/clothes" },
    { label: "Electronics", href: "/category/electronics" },
    { label: "Footwears", href: "/category/footwears" },
  ],
  customer: [
    { label: "My Account", href: "/profile" },
    { label: "My Orders", href: "/orders" },
    { label: "Shopping Cart", href: "/cart" },
  ],
  resources: [
    { label: "Product Details", href: "/product/1" },
    { label: "Categories", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">ShopStyle</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop shop for fashion, electronics, and footwear. Quality products at unbeatable prices.
            </p>
            {/* Payment methods */}
            <div className="mt-6">
              <p className="text-xs font-medium text-muted-foreground">Accepted Payments</p>
              <div className="mt-2 flex gap-2">
                {["Visa", "MC", "PayPal", "Apple"].map((method) => (
                  <div 
                    key={method} 
                    className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background text-[10px] font-medium text-muted-foreground"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Customer Service</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShopStyle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
