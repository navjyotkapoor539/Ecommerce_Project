import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  product: any;
  onDelete: (id: string) => void;
};

export const AdminProductCard = ({ product, onDelete }: Props) => {
  return (
    <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]} // Access the first image in the array
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description || "No description"}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.category?.name || "No category"}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">Stock: {product.stock}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">₹{product.price}</span>

          <span
            className={`text-xs px-2 py-1 rounded ${
              product.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/admin/products/${product._id}/edit`}>
            <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-gray-100">
              <Pencil size={14} />
              Edit
            </button>
          </Link>

          <button
            onClick={() => onDelete(product._id)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
