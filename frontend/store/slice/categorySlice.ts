import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export type Category = {
  _id: string;
  name: string;
};

type CategoryState = {
  categories: Category[];
  loading: boolean;
};

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await api.get("/categories");
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      });
  },
});

export default categorySlice.reducer;
