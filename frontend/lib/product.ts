import api from "./axios";

export const getProductById=(id:string)=>api.get(`/products/${id}`);
export const updateProduct=(id:string,data:any)=>api.put(`/products/${id}`,data);
export const getAllOrders=()=>api.get(`/orders`); //admin route
export const getAllUsers=()=>api.get(`/auth/users`); //admin route

export const getProductsByCategory = async (params: any) => {
  return await api.get("/products", { params });
};
export const getSaleProducts=()=>api.get(`/products?sale=true`);