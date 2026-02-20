"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSaleProducts } from "@/lib/product";
import { useAppSelector } from "@/store/hook";
import api from "@/lib/axios";
import { ShoppingCart, ArrowRight, Flame, Tag } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function SalePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const res = await getSaleProducts();
        // Accessing res.data.products based on our previous fix
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching sale products");
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await api.post("/cart/add", {
        userId: user?._id,
        productId,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (error) {
      console.error("Add to cart error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Flame size={32} className="text-destructive" />
            <h1 className="text-4xl font-bold text-foreground">Limited Time Sale</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Get amazing discounts on selected items. Hurry, stock is limited!
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-muted-foreground">Loading sale products...</div>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <Flame size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground mb-4">No products on sale right now</p>
            <Link href="/" className="text-primary font-semibold hover:underline">
              Browse all categories
            </Link>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              // Calculate the sale price based on the discount percentage from DB
              const hasDiscount = product.discount && product.discount > 0;
              const salePrice = hasDiscount 
                ? Math.floor(product.price * (1 - product.discount / 100)) 
                : product.price;

              return (
                <div
                  key={product._id}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group relative"
                >
                  {hasDiscount && (
                    <div className="absolute top-4 right-4 z-10 bg-destructive text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Tag size={14} />
                      {product.discount}% OFF
                    </div>
                  )}

                  <Link href={`/product/${product._id}`}>
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  </Link>

                  <div className="p-5">
                    <Link href={`/product/${product._id}`}>
                      <h2 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <p className="text-2xl font-bold text-destructive">
                        ₹{salePrice}
                      </p>
                      {hasDiscount && (
                        <p className="text-lg text-muted-foreground line-through">
                          ₹{product.price}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>

                    <Link
                      href={`/product/${product._id}`}
                      className="text-center text-primary font-semibold hover:underline text-sm flex items-center justify-center gap-1"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}