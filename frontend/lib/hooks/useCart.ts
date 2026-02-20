"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useCart = () => {
  const queryClient = useQueryClient();

  // 🛒 GET CART
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("/cart");
      return res.data;
    },
  });

  // ➕ ADD TO CART
  const addToCart = useMutation({
    mutationFn: (productId: string) =>
      api.post("/cart/add", { productId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // 🔄 UPDATE QTY
  const updateQty = useMutation({
    mutationFn: ({ productId, quantity }: any) =>
      api.put("/cart/update", { productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // ❌ REMOVE ITEM
  const removeItem = useMutation({
    mutationFn: (productId: string) =>
      api.delete(`/cart/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cart: cartQuery.data,
    loading: cartQuery.isLoading,
    addToCart,
    updateQty,
    removeItem,
  };
};
