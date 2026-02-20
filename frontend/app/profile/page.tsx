"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { User, Mail, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "orders" && user) {
      setOrdersLoading(true);
      api
        .get("/orders/my-orders")
        .then((res) => setOrders(res.data))
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab, user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <User size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-4">
            Please login to view your profile
          </p>
          <Link
            href="/login"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account and preferences
              </p>
            </div>
            <button className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <User className="h-6 w-6 text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 h-fit">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                    activeTab === "account"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Account Info
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                    activeTab === "orders"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Account Info Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      Personal Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name || ""}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:text-muted-foreground"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Recent Orders
                </h2>

                {ordersLoading && (
                  <div className="text-center py-10 text-muted-foreground">
                    <div className="inline-flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Loading orders...
                    </div>
                  </div>
                )}

                {!ordersLoading && orders.length === 0 && (
                  <div className="text-center py-10">
                    <Package
                      size={40}
                      className="mx-auto mb-3 text-muted-foreground"
                    />
                    <p className="text-muted-foreground">
                      No orders placed yet.
                    </p>
                    <Link
                      href="/"
                      className="mt-4 inline-block text-primary font-semibold hover:underline"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}

                {!ordersLoading && orders.length > 0 && (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-foreground font-mono">
                            #{order._id?.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.items.length} item(s)
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ₹{order.totalAmount}
                          </p>
                          <p
                            className={`text-sm font-medium capitalize ${
                              order.orderStatus === "delivered"
                                ? "text-green-600"
                                : order.orderStatus === "shipped"
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {order.orderStatus}
                          </p>
                        </div>

                        <Link
                          href="/orders"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                {!ordersLoading && orders.length > 0 && (
                  <Link
                    href="/orders"
                    className="mt-6 block text-center text-primary font-semibold hover:underline"
                  >
                    View All Orders →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
