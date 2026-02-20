import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export type Product={
    _id:string,
    name:string,
    description:string,
    price:number,
    images:string[],
    stock:number,
    isActive:boolean,
    category:string
}
type ProductState={
    products:Product[],
    loading:Boolean,
}

const initialState:ProductState={
    products:[],
    loading:false
}

export const fetchAdminProducts=createAsyncThunk("products/fetchAdminProducts",async()=>{
    const response=await api.get("/products")
    return response.data.products;
});

export const deleteProduct=createAsyncThunk("products/deleteProduct",async(id:string)=>{
     await api.delete(`/products/${id}`)
    return id;
});

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminProducts.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload
        })
       .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      });
    }
})

export default productSlice.reducer