"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { useAppSelector } from "@/store/hook";
import { AdminProductCard } from "@/app/components/admin/AdminProductCard";
import { deleteProduct, fetchAdminProducts } from "@/store/slice/productSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <AdminProductCard
            key={product._id}
            product={product}
            onDelete={(id) => dispatch(deleteProduct(id))}
          />
        ))}
      </div>
    </div>
  );
}
