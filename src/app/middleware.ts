import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Middleware function
export default withAuth(
  async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = await getToken({ req, secret: process.env.SECRET });

    if (token) {
      if (pathname === "/login" || pathname === "/register") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (pathname === "/create-trip" && token.role !== "agent") {
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
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Token must be valid in all cases
        return !!token;
      },
    },
  }
);

// Configuring the paths to apply the middleware
export const config = {
  matcher: ["/login", "/register", "/create-trip", "/protected/:path*", "/agent/:path*"],
};
