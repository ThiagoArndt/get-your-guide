import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { RolesEnum } from "@entities/interfaces";

// Middleware function
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.SECRET });

  if (token) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/create-trip" && token.role !== RolesEnum.AGENT) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (pathname === "/create-trip") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // else {
  //   if (pathname.startsWith("/protected") || pathname.startsWith("/agent")) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  // }

  // Allow the request to proceed if none of the conditions matched
  return NextResponse.next();
}
