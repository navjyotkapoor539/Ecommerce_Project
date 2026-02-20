"use client";

import { getAllOrders } from "@/lib/product";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res.data);
      } catch {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  const statusColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-200 text-blue-800";
      case "PROCESSING":
        return "bg-yellow-200 text-yellow-800";
      case "SHIPPED":
        return "bg-purple-200 text-purple-800";
      case "DELIVERED":
        return "bg-green-200 text-green-800";
      case "CANCELLED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{order._id}</td>
                <td className="p-3">
                  {order.user?.name} <br />
                  <span className="text-xs text-gray-500">
                    {order.user?.email}
                  </span>
                </td>
                <td className="p-3">₹{order.totalAmount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
