import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest){
    const {pathname}=request.nextUrl;
    const token=request.cookies.get("accessToken")?.value;
    
    if(pathname.startsWith("/login")||pathname.startsWith("/register")||pathname === "/"){
        return NextResponse.next();
    }
     if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const { payload } = await jwtVerify(token, secret);

   //console.log("Middleware Payload:", payload);
    const role = payload.role as "user" | "admin";
    // 🔐 Admin protection
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};