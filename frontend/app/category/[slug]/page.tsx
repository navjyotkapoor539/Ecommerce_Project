"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/product";
import { useAppSelector } from "@/store/hook";
import {ShoppingCart, Search,Filter,ArrowRight,Package} from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { useCart } from "@/lib/hooks/useCart";
import { toast } from "sonner";

export default function CategoryPage() {
  const { slug } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState("latest");
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsByCategory({
          category: slug,
          search: search.toLowerCase(),
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort: sortBy,
          limit: 10
        });
        setProducts(res.data.products);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (slug) fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [slug, search, priceRange, sortBy]);

  // Advanced filtering and sorting

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    setAddingId(productId);
    addToCart.mutate(productId, {
      onSuccess: () => toast.success("Added to cart"),
      onError: () => toast.error("Failed to add"),
    });
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Collection
            </p>
          </div>
          <h1 className="text-5xl font-bold capitalize text-foreground mb-2">
            {slug}
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover premium {slug} products carefully curated for quality and
            style
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`Search ${slug}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full h-2 bg-muted rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ₹{priceRange[0]}
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-2 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="latest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearch("");
                  setPriceRange([0, 100000]);
                  setSortBy("featured");
                }}
                className="w-full py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Loading products...
                </div>
              </div>
            )}

            {!loading && products.length==0&&(
              <div className="text-center py-20 bg-card/50 rounded-lg">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  No products found
                </p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Back to Shopping <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {!loading && products.length>0 &&(
              <>
                <p className="text-sm text-muted-foreground mb-6 font-medium">
                  Showing {products.length} of {products.length}{" "}
                  products
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div className="relative h-72 bg-muted overflow-hidden">
                        <img
                          src={product.images?.[0] || "/placeholder.png"}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                            New
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {product.name}
                          </h2>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-4 w-4 text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            (4.8)
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{Math.round(product.price * 1.2)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product._id)}
                          disabled={addingId === product._id}
                          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 group/btn"
                        >
                          <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                          {addingId === product._id
                            ? "Adding..."
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
