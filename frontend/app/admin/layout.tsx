"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <nav className="space-y-3 flex flex-col gap-2">
          <Link href="/admin" className="block hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/users">Users</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
