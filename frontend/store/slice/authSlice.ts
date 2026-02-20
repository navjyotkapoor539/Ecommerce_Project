import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";
//import { setAccessToken,clearAccessToken } from "@/lib/token";

type User={
    _id:string,
    name:string,
    email:string,
    role:"user"|"admin"
};

type AuthState={
    user:User | null,
    loading:boolean,
    error:string | null
};

const initialState:AuthState={
    user:null,
    loading:false,
    error:null
};
 export const fetchMe=createAsyncThunk("auth/fetchMe",async(_,thunkAPI)=>{
    try {
    const response=await api.get("/auth/me");
    return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const login =createAsyncThunk("auth/login",async( data: { email: string; password: string },
    thunkAPI)=>{
        try {
      const res=await api.post("/auth/login", data);
      //setAccessToken(res.data.accessToken)
      const me = await api.get("/auth/me");
      return me.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Invalid credentials");
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  //clearAccessToken();
});

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMe.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchMe.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(fetchMe.rejected,(state)=>{
            state.user=null;
            state.loading=false;
        })
        //login
        .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
    }
})

export default authSlice.reducer;