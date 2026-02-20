"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import api from "@/lib/axios";
import Link from "next/link";
import { Package, Calendar, DollarSign, Truck, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function OrdersPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data);
      } catch {
        console.error("Orders fetch error");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock size={20} className="text-yellow-600" />;
      case "shipped":
        return <Truck size={20} className="text-blue-600" />;
      case "delivered":
        return <CheckCircle size={20} className="text-green-600" />;
      default:
        return <Package size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      case "shipped":
        return "bg-blue-50 border-blue-200";
      case "delivered":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-4">Please login to view your orders</p>
          <Link href="/login" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Go to Login
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">Loading your orders...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-4">You haven't placed any orders yet</p>
          <Link href="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto">
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">You have {orders.length} order(s)</p>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`border-2 rounded-lg p-6 transition-all hover:shadow-lg ${getStatusColor(order.orderStatus)}`}
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-current border-opacity-20">
                <div className="flex items-center gap-4">
                  {getStatusIcon(order.orderStatus)}
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="text-lg font-bold text-card-foreground font-mono">
                      {order._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-bold text-card-foreground capitalize">
                    {order.orderStatus}
                  </p>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ordered Date</p>
                    <p className="font-semibold text-card-foreground text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="font-semibold text-card-foreground text-sm">₹{order.totalAmount}</p>
                  </div>
                </div>

                {/* Item Count */}
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="font-semibold text-card-foreground text-sm">{order.items.length} product(s)</p>
                  </div>
                </div>

                {/* Delivery Status */}
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Delivery</p>
                    <p className="font-semibold text-card-foreground text-sm">
                      {order.orderStatus === "delivered" ? "Delivered" : "In Transit"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-card/50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-card-foreground mb-3">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between items-center text-sm pb-2 border-b border-border/50 last:border-0"
                    >
                      <span className="text-card-foreground">
                        {item.product.name}
                        <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Track Order
                </button>
                <Link
                  href="/"
                  className="flex-1 border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
                >
                  Shop Again
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Want to shop more?</p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Browse Categories
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
