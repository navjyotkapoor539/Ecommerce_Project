"use client";

import { useAppSelector } from "@/store/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCart } from "@/lib/hooks/useCart";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function CartPage() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { cart, loading, updateQty, removeItem } = useCart();

  // 🚫 NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-4">
            Please login to view your cart
          </p>
          <Link
            href="/login"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Go to Login
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">Loading your cart...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // 🛒 EMPTY CART
  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-4">
            Your cart is empty
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // 💳 CHECKOUT
  const checkout = async () => {
    try {
      await api.post("/orders");
      toast.success("Order placed successfully");
      router.push("/orders");
    } catch {
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground mb-8">
          {cart.items.length} item(s) in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧾 ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item: any) => (
              <div
                key={item.product._id}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* IMAGE */}
                  <Link href={`/product/${item.product._id}`}>
                    <img
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* DETAILS */}
                  <div className="flex-1">
                    <Link href={`/product/${item.product._id}`}>
                      <h2 className="text-lg font-semibold hover:text-primary">
                        {item.product.name}
                      </h2>
                    </Link>

                    <p className="text-primary font-bold text-xl mb-4">
                      ₹{item.product.price}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() =>
                          updateQty.mutate({
                            productId: item.product._id,
                            quantity: item.quantity - 1,
                          })
                        }
                        className="bg-muted p-2 rounded hover:bg-primary hover:text-white"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="px-4 py-2 bg-muted rounded font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty.mutate({
                            productId: item.product._id,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="bg-muted p-2 rounded hover:bg-primary hover:text-white"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Subtotal: ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem.mutate(item.product._id)}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 SUMMARY */}
          <div className="bg-card border border-border rounded-lg p-6 sticky top-20 h-fit shadow-md">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cart.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">
                ₹{cart.totalAmount}
              </span>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingBag size={18} />
              Checkout
            </button>

            <Link
              href="/"
              className="w-full text-center border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
