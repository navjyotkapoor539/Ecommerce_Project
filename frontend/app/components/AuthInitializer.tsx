"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchMe } from "@/store/slice/authSlice";
import { getAccessToken } from "@/lib/token";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  return null;
}