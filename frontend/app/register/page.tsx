"use client";

import { useState } from "react";
import Link from "next/link"; 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { login } from "@/store/slice/authSlice";
import api from "@/lib/axios";
import { toast } from "sonner"; // Import toast

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match"); // Toast for validation
    }

    try {
      // 1. Register Request
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // 2. Attempt Login
      const result = await dispatch(
        login({ email: form.email, password: form.password })
      );

      if (login.fulfilled.match(result)) {
        toast.success("Account created!", {
          description: `Welcome to ShopStyle, ${form.name}!`,
        });
        router.push("/");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error during registration";
      toast.error(errorMessage); // Error toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-none shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Create an Account
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Enter your details below to get started
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                name="name" 
                placeholder="John Doe" 
                onChange={handleChange} 
                className="focus-visible:ring-primary"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                onChange={handleChange} 
                className="focus-visible:ring-primary"
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="•••••••••••••"
                  onChange={handleChange}
                  className="focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="•••••••••••••"
                  onChange={handleChange}
                  className="focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 transition-all"
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pb-8">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="font-semibold text-primary hover:underline transition-all"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}