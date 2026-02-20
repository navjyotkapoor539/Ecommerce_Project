"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { fetchCategories } from "@/store/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

export default function NewProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((s) => s.categories);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    images: "",
    category: "",
    isActive: true,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/products", {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      discount: Number(form.discount || 0),
      images: [form.images],
      category: form.category,
      isActive: form.isActive,
    });

    router.push("/admin/products");
  };

  return (
    <form
      className="max-w-xl space-y-6 bg-white p-6 rounded-lg shadow"
      onSubmit={submit}
    >
      <h1 className="text-2xl font-bold">Add Product</h1>

      <Input
        placeholder="Product Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        placeholder="Image URL"
        onChange={(e) => setForm({ ...form, images: e.target.value })}
      />

      <Input
        type="number"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <Input
        type="number"
        placeholder="Discount % (0 if none)"
        onChange={(e) => setForm({ ...form, discount: e.target.value })}
      />

      <Input
        type="number"
        placeholder="Stock"
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      {/* CATEGORY DROPDOWN */}
      <div className="space-y-2">
        <Label>Category</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <Switch
          checked={form.isActive}
          onCheckedChange={(v) => setForm({ ...form, isActive: v })}
        />
        <span>{form.isActive ? "Active" : "Inactive"}</span>
      </div>

      <Button type="submit">Create Product</Button>
    </form>
  );
}
