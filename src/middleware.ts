import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { publicRoutes, protectedRoutes } from '@/utils/routes';

export function middleware(request: NextRequest) {
  // Get the token from the request cookies
  const token = request.cookies.get('next-auth.session-token');
  console.log(token, 'Next Token')

  // Define the protected routes based on the enum
  const protectedRoutesList = Object.values(protectedRoutes);

  // Check if the requested URL is a protected route
  const isProtectedRoute = protectedRoutesList.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If the token doesn't exist and trying to access a protected route
  if (!token && isProtectedRoute) {
    // Redirect to the login page
    return NextResponse.redirect(new URL(publicRoutes.AUTH_SIGN_IN, request.url));
  }

  // If the token exists and trying to access a public route, redirect to the home page
  const publicRoutesList = Object.values(publicRoutes);
  const isPublicRoute = publicRoutesList.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (token && isPublicRoute) {
    // Redirect to the home page (or another protected route)
    return NextResponse.redirect(new URL(protectedRoutes.HOME, request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}
