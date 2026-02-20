"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/lib/product";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    images: [""],
    category: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductById(id as string);
      const p = res.data;

      setForm({
        name: p.name,
        description: p.description,
        price: String(p.price),
        stock: String(p.stock),
        discount: String(p.discount || 0),
        images: p.images?.length ? p.images : [""],
        category: p.category?._id || "",
        isActive: p.isActive,
      });

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateProduct(id as string, {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      discount: Number(form.discount),
    });

    router.push("/admin/products");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={submit}
      className="max-w-xl space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input name="name" value={form.name} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input
          value={form.images[0]}
          onChange={(e) => setForm({ ...form, images: [e.target.value] })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Stock</Label>
          <Input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Label>Discount (%)</Label>
          <Input
            name="discount"
            type="number"
            min="0"
            max="90"
            value={form.discount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={form.isActive}
          onCheckedChange={(val) => setForm({ ...form, isActive: val })}
        />
        <span>{form.isActive ? "Active" : "Inactive"}</span>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Update</Button>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
