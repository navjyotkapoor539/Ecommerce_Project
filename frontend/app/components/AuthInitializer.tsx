"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchMe } from "@/store/slice/authSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return null;
}
