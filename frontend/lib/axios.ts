import axios from "axios";
import {getAccessToken,setAccessToken,clearAccessToken} from "./token";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config)=>{
  const token=getAccessToken();
  if(token){
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config;
})

api.interceptors.response.use((res)=>
res,
async(error)=>{
  const originalRequest=error.config;
  if(error.response?.status===401 && !originalRequest._retry){
    originalRequest._retry=true;
    try {
      //hit refresh token api
      const res=await axios.post(`${API_URL}/api/auth/refresh`,{},{
        withCredentials:true
      });
      setAccessToken(res.data.accessToken);
      originalRequest.headers.Authorization=`Bearer ${res.data.accessToken}`;
      return api(originalRequest);
    } catch (error) {
      clearAccessToken();
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
}
)

export default api;