"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart,Sofa, Shirt, Smartphone, Footprints, LayoutDashboard, User, LogOut,HomeIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout } from "@/store/slice/authSlice";
import { toast } from "sonner";
import { useCart } from "@/lib/hooks/useCart";

const categories = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/category/clothes", label: "Clothes", icon: Shirt },
  { href: "/category/electronics", label: "Electronics", icon: Smartphone },
  { href: "/category/footwears", label: "FootWears", icon: Footprints },
  { href: "/category/furniture", label: "Furnitures", icon: Sofa },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useCart();
  const cartCount = cart?.items?.length || 0;
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully", {
        description: "We hope to see you back soon!",
      });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">ShopStyle</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Categories */}
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </Link>
          ))}
          {/* Divider and navLinks map removed from here */}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            </Link>
          </Button>
          <div className="mx-2 h-5 w-px bg-border" />
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <Button variant="ghost" asChild>
                  <Link href="/admin" className="flex items-center gap-1">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}

              <Button variant="ghost" asChild>
                <Link href="/profile" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </Link>
          </Button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col gap-2 px-4 py-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Shop by Category
            </p>
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <category.icon className="h-5 w-5 text-primary" />
                {category.label}
              </Link>
            ))}
                        
            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
             {!user ? (
                <>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register">Sign up</Link>
                  </Button>
                </>
              ) : (
                <>
                  {user?.role === "admin" && (
                    <Button variant="ghost" asChild className="w-full">
                      <Link href="/admin">Admin Dashboard</Link>
                    </Button>
                  )}
                  <Button variant="ghost" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}